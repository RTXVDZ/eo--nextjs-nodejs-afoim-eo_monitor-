import { NextResponse } from 'next/server'
import { teo } from "tencentcloud-sdk-nodejs-teo"
import { getKeys } from '@/app/lib/keys'

export async function GET() {
    try {
        console.log('🔍 开始处理zones请求')
        console.log('环境信息:', {
            NODE_ENV: process.env.NODE_ENV,
            CF_PAGES: process.env.CF_PAGES,
            CLOUDFLARE_PAGES: process.env.CLOUDFLARE_PAGES
        })
        
        const { secretId, secretKey } = getKeys()
        
        if (!secretId || !secretKey) {
            console.error('❌ 缺少API凭据')
            return NextResponse.json({ 
                error: "Missing credentials",
                message: "请在Cloudflare Pages环境变量中设置SECRET_ID和SECRET_KEY",
                debug: {
                    secretIdPresent: !!secretId,
                    secretKeyPresent: !!secretKey,
                    envKeys: Object.keys(process.env).filter(key => 
                        key.includes('SECRET') || key.includes('CF_') || key.includes('NEXT_')
                    )
                }
            }, { status: 500 })
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