import { NextResponse } from 'next/server'

export async function GET() {
    console.log('🔍 开始处理config请求')
    console.log('环境变量检查:', {
        SITE_NAME: process.env.SITE_NAME ? '已设置' : '未设置',
        SITE_ICON: process.env.SITE_ICON ? '已设置' : '未设置'
    })
    
    return NextResponse.json({
        siteName: process.env.SITE_NAME || 'AcoFork 的 EdgeOne 监控大屏',
        siteIcon: process.env.SITE_ICON || 'https://q2.qlogo.cn/headimg_dl?dst_uin=2726730791&spec=0',
        debug: {
            envKeys: Object.keys(process.env).filter(key => 
                key.includes('SITE') || key.includes('CF_') || key.includes('NEXT_')
            )
        }
    })
}