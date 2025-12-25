'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

export default function SecuritySection() {
  const [securityHits, setSecurityHits] = useState('加载中...')

  useEffect(() => {
    // Fetch security data
    fetchSecurityData()
  }, [])

  const fetchSecurityData = async () => {
    // Implement data fetching logic
    setSecurityHits('123')
  }

  const chartOption = {
    title: {
      text: '安全防护趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '防护命中次数',
        type: 'line',
        smooth: true,
        data: [12, 13, 10, 13, 9, 23, 21]
      }
    ]
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        安全分析 (Security Analysis)
      </h2>
      
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
        {/* Total Protection Hits */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">总防护命中次数</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_security_hits">{securityHits}</div>
            <p className="text-xs text-muted-foreground mt-1">DDoS/CC 防护总拦截次数</p>
          </div>
        </div>
      </div>
      
      {/* Security Chart */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold leading-none tracking-tight">安全防护趋势</h3>
        </div>
        <div className="p-6 pt-0">
          <div id="chart_security" className="w-full h-[350px]">
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}