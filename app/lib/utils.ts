// Utility functions for data processing

export function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
}

export function formatTimeRange(range: string): { startTime: string; endTime: string } {
    const now = new Date()
    const formatDate = (date: Date) => date.toISOString().slice(0, 19) + 'Z'
    
    let startTime = new Date()
    
    switch (range) {
        case '30min':
            startTime = new Date(now.getTime() - 30 * 60 * 1000)
            break
        case '1h':
            startTime = new Date(now.getTime() - 60 * 60 * 1000)
            break
        case '6h':
            startTime = new Date(now.getTime() - 6 * 60 * 60 * 1000)
            break
        case 'today':
            startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            break
        case 'yesterday':
            startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
            break
        case '3d':
            startTime = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
            break
        case '7d':
            startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            break
        case '14d':
            startTime = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
            break
        case '31d':
            startTime = new Date(now.getTime() - 31 * 24 * 60 * 60 * 1000)
            break
        default:
            startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000) // default to 24h
    }
    
    return {
        startTime: formatDate(startTime),
        endTime: formatDate(now)
    }
}

export function processChartData(data: any[], metricName?: string) {
    if (!data || data.length === 0) {
        return { timeData: [], valueData: [], sum: 0, max: 0, avg: 0 }
    }
    
    let typeValue
    if (metricName) {
        if (data[0]?.TypeValue) {
            typeValue = data[0].TypeValue.find((item: any) => item.MetricName === metricName)
        } else if (data[0]?.Value) {
            typeValue = data[0].Value.find((item: any) => item.MetricName === metricName)
        }
    }
    
    if (!typeValue) {
        typeValue = data[0]?.TypeValue?.[0]
        if (!typeValue && data[0]?.Value?.[0]) {
            typeValue = data[0].Value[0]
        }
    }
    
    const details = typeValue?.Detail || []
    const sum = typeValue?.Sum || 0
    const max = typeValue?.Max || 0
    const avg = typeValue?.Avg || 0
    
    const timeData = details.map((item: any) => {
        const date = new Date(item.Timestamp * 1000)
        return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    })
    
    const valueData = details.map((item: any) => item.Value)
    
    return { timeData, valueData, sum, max, avg }
}