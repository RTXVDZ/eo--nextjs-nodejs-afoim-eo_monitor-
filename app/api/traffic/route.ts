import { NextResponse } from 'next/server'
import { teo } from "tencentcloud-sdk-nodejs-teo"
import { CommonClient } from "tencentcloud-sdk-nodejs-common"
import { getKeys, ORIGIN_PULL_METRICS, TOP_ANALYSIS_METRICS, SECURITY_METRICS, FUNCTION_METRICS } from '@/app/lib/keys'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const { secretId, secretKey } = getKeys()
        
        if (!secretId || !secretKey) {
            return NextResponse.json({ error: "Missing credentials" }, { status: 500 })
        }

        const TeoClient = teo.v20220901.Client
        const clientConfig = {
            credential: {
                secretId: secretId,
                secretKey: secretKey,
            },
            region: "ap-guangzhou",
            profile: {
                httpProfile: {
                    endpoint: "teo.tencentcloudapi.com",
                },
            },
        }

        const client = new TeoClient(clientConfig)
        
        const now = new Date()
        const formatDate = (date: Date) => {
             return date.toISOString().slice(0, 19) + 'Z'
        }

        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)

        const metric = searchParams.get('metric') || "l7Flow_flux"
        const startTime = searchParams.get('startTime') || formatDate(yesterday)
        const endTime = searchParams.get('endTime') || formatDate(now)
        const interval = searchParams.get('interval')
        const zoneId = searchParams.get('zoneId')
        const zoneIds = zoneId ? [ zoneId ] : [ "*" ]

        let params: any = {}
        let data: any

        console.log(`Requesting metric: ${metric}, StartTime: ${startTime}, EndTime: ${endTime}, Interval: ${interval}`)

        if (TOP_ANALYSIS_METRICS.includes(metric)) {
            // API: DescribeTopL7AnalysisData
            params = {
                "StartTime": startTime,
                "EndTime": endTime,
                "MetricName": metric,
                "ZoneIds": zoneIds
            }
            console.log("Calling DescribeTopL7AnalysisData with params:", JSON.stringify(params, null, 2))
            data = await client.DescribeTopL7AnalysisData(params)
        } else if (SECURITY_METRICS.includes(metric)) {
            // API: DescribeWebProtectionData (DDoS) using CommonClient
            params = {
                "StartTime": startTime,
                "EndTime": endTime,
                "MetricNames": [ metric ],
                "ZoneIds": zoneIds
            }

            if (interval && interval !== 'auto') {
                params["Interval"] = interval
            }
            
            // CommonClient setup
            const commonClientConfig = {
                credential: {
                    secretId: secretId,
                    secretKey: secretKey,
                },
                region: "ap-guangzhou",
                profile: {
                    httpProfile: {
                        endpoint: "teo.tencentcloudapi.com",
                    },
                },
            }

            const commonClient = new CommonClient(
                "teo.tencentcloudapi.com",
                "2022-09-01",
                commonClientConfig
            )

            console.log("Calling DescribeWebProtectionData with params:", JSON.stringify(params, null, 2))
            data = await commonClient.request("DescribeWebProtectionData", params)
            
        } else if (FUNCTION_METRICS.includes(metric)) {
            // API: DescribeTimingFunctionAnalysisData (Edge Functions)
            let metricNames = [metric]
            if (metric === 'function_cpuCostTime') {
                metricNames = ["function_requestCount", "function_cpuCostTime"]
            }

            params = {
                "StartTime": startTime,
                "EndTime": endTime,
                "MetricNames": metricNames,
                "ZoneIds": zoneIds
            }

            if (interval && interval !== 'auto') {
                params["Interval"] = interval
            }

            console.log("Calling DescribeTimingFunctionAnalysisData with params:", JSON.stringify(params, null, 2))
            
            // Use CommonClient for DescribeTimingFunctionAnalysisData
            const commonClientConfig = {
                credential: {
                    secretId: secretId,
                    secretKey: secretKey,
                },
                region: "ap-guangzhou",
                profile: {
                    httpProfile: {
                        endpoint: "teo.tencentcloudapi.com",
                    },
                },
            }

            const commonClient = new CommonClient(
                "teo.tencentcloudapi.com",
                "2022-09-01",
                commonClientConfig
            )

            data = await commonClient.request("DescribeTimingFunctionAnalysisData", params)

        } else {
            // API: DescribeTimingL7AnalysisData OR DescribeTimingL7OriginPullData
            params = {
                "StartTime": startTime,
                "EndTime": endTime,
                "MetricNames": [ metric ],
                "ZoneIds": zoneIds
            }

            if (interval && interval !== 'auto') {
                params["Interval"] = interval
            }
            
            console.log("Calling Timing API with params:", JSON.stringify(params, null, 2))
            
            if (ORIGIN_PULL_METRICS.includes(metric)) {
                data = await client.DescribeTimingL7OriginPullData(params)
            } else {
                data = await client.DescribeTimingL7AnalysisData(params)
            }
        }
        
        return NextResponse.json(data)
    } catch (err: any) {
        console.error("Error calling Tencent Cloud API:", err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}