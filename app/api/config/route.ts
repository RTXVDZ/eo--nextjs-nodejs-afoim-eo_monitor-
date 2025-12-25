import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({
        siteName: process.env.SITE_NAME || 'AcoFork 的 EdgeOne 监控大屏',
        siteIcon: process.env.SITE_ICON || 'https://q2.qlogo.cn/headimg_dl?dst_uin=2726730791&spec=0'
    })
}