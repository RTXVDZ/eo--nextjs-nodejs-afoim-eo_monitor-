import { NextResponse } from 'next/server'
import { teo } from "tencentcloud-sdk-nodejs-teo"
import { CommonClient } from "tencentcloud-sdk-nodejs-common"
import { getKeys } from '@/app/lib/keys'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const { secretId, secretKey } = getKeys()
        
        if (!secretId || !secretKey) {
            return NextResponse.json({ error: "Missing credentials" }, { status: 500 })
        }

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

        const client = new CommonClient(
            "teo.tencentcloudapi.com",
            "2022-09-01",
            commonClientConfig
        )

        // 1. Find ZoneId
        let targetZoneId = searchParams.get('zoneId')
        const startTime = searchParams.get('startTime')
        const endTime = searchParams.get('endTime')

        if (!targetZoneId) {
             try {
                const TeoClient = teo.v20220901.Client
                const teoClient = new TeoClient({
                    credential: { secretId, secretKey },
                    region: "ap-guangzhou",
                    profile: { httpProfile: { endpoint: "teo.tencentcloudapi.com" } }
                })
                
                const zonesData = await teoClient.DescribeZones({})
                if (zonesData && zonesData.Zones) {
                    const pagesZone = zonesData.Zones.find((z: any) => z.ZoneName === 'default-pages-zone')
                    if (pagesZone) {
                        targetZoneId = pagesZone.ZoneId
                        console.log(`Found default-pages-zone: ${targetZoneId}`)
                    } else if (zonesData.Zones.length > 0) {
                        targetZoneId = zonesData.Zones[0].ZoneId
                        console.log(`default-pages-zone not found, using first zone: ${targetZoneId}`)
                    }
                }
             } catch (zErr) {
                 console.error("Error fetching zones for Pages:", zErr)
             }
        }

        if (!targetZoneId) {
            return NextResponse.json({ error: "Missing ZoneId and could not auto-discover one." }, { status: 400 })
        }

        const payload: any = {
            ZoneId: targetZoneId,
            Interval: "hour"
        }
        
        if (startTime) payload.StartTime = startTime
        if (endTime) payload.EndTime = endTime

        const params = {
            "ZoneId": targetZoneId,
            "Interface": "pages:DescribePagesFunctionsRequestDataByZone",
            "Payload": JSON.stringify(payload)
        }
        
        console.log("Calling DescribePagesResources (CloudFunction) with params:", JSON.stringify(params))
        const data = await client.request("DescribePagesResources", params)
        
        // Parse Result string if present
        if (data && data.Result) {
            try {
                data.parsedResult = JSON.parse(data.Result)
            } catch (e) {
                console.error("Error parsing Result JSON:", e)
            }
        }
        
        return NextResponse.json(data)
    } catch (err: any) {
        console.error("Error calling DescribePagesResources for CloudFunction:", err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}