import fs from 'fs'
import path from 'path'

// Function to read keys
export function getKeys() {
    // 1. Try Environment Variables first
    let secretId = process.env.SECRET_ID
    let secretKey = process.env.SECRET_KEY

    if (secretId && secretKey) {
        return { secretId, secretKey }
    }

    // 2. Try key.txt if Env Vars are missing
    try {
        const keyPath = path.resolve(process.cwd(), 'key.txt')
        
        if (fs.existsSync(keyPath)) {
            const content = fs.readFileSync(keyPath, 'utf-8')
            const lines = content.split('\n')
            
            lines.forEach(line => {
                if (line.includes('SecretId') && !secretId) {
                    secretId = line.split('：')[1].trim()
                }
                if (line.includes('SecretKey') && !secretKey) {
                    secretKey = line.split('：')[1].trim()
                }
            })
        }
    } catch (err) {
        console.error("Error reading key.txt:", err)
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