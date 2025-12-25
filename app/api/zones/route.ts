import { NextResponse } from 'next/server'
import { teo } from "tencentcloud-sdk-nodejs-teo"
import { getKeys } from '@/app/lib/keys'

export async function GET() {
    try {
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
        const params = {}
        
        console.log("Calling DescribeZones...")
        const data = await client.DescribeZones(params)
        return NextResponse.json(data)
    } catch (err: any) {
        console.error("Error calling DescribeZones:", err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}