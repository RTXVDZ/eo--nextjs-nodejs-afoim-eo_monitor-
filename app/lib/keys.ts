// Function to read keys from environment variables
export function getKeys() {
    const secretId = process.env.SECRET_ID
    const secretKey = process.env.SECRET_KEY

    // 添加调试日志
    if (!secretId || !secretKey) {
        console.warn('⚠️  API密钥未找到或为空')
        console.log('环境变量检查:')
        console.log('- SECRET_ID:', secretId ? '已设置' : '未设置')
        console.log('- SECRET_KEY:', secretKey ? '已设置' : '未设置')
        console.log('当前环境变量:', Object.keys(process.env).filter(key => 
            key.includes('SECRET') || key.includes('CF_') || key.includes('NEXT_')
        ))
    } else {
        console.log('✅ API密钥验证通过')
    }

    return { secretId, secretKey }
}

// Metrics that belong to DescribeTimingL7OriginPullData
export const ORIGIN_PULL_METRICS = [
    'l7Flow_outFlux_hy',
    'l7Flow_outBandwidth_hy',
    'l7Flow_request_hy',
    'l7Flow_inFlux_hy',
    'l7Flow_inBandwidth_hy'
]

// Metrics that belong to DescribeTopL7AnalysisData
export const TOP_ANALYSIS_METRICS = [
    'l7Flow_outFlux_country',
    'l7Flow_outFlux_province',
    'l7Flow_outFlux_statusCode',
    'l7Flow_outFlux_domain',
    'l7Flow_outFlux_url',
    'l7Flow_outFlux_resourceType',
    'l7Flow_outFlux_sip',
    'l7Flow_outFlux_referers',
    'l7Flow_outFlux_ua_device',
    'l7Flow_outFlux_ua_browser',
    'l7Flow_outFlux_ua_os',
    'l7Flow_outFlux_ua',
    'l7Flow_request_country',
    'l7Flow_request_province',
    'l7Flow_request_statusCode',
    'l7Flow_request_domain',
    'l7Flow_request_url',
    'l7Flow_request_resourceType',
    'l7Flow_request_sip',
    'l7Flow_request_referers',
    'l7Flow_request_ua_device',
    'l7Flow_request_ua_browser',
    'l7Flow_request_ua_os',
    'l7Flow_request_ua'
]

// Metrics that belong to DescribeWebProtectionData (DDoS/Security)
export const SECURITY_METRICS = [
    'ccAcl_interceptNum',
    'ccManage_interceptNum',
    'ccRate_interceptNum'
]

// Metrics that belong to DescribeTimingFunctionAnalysisData (Edge Functions)
export const FUNCTION_METRICS = [
    'function_requestCount',
    'function_cpuCostTime'
]