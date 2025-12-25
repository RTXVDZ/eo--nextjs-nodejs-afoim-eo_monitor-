'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

export default function BandwidthSection() {
  const [totalBandwidth, setTotalBandwidth] = useState('加载中...')
  const [inBandwidth, setInBandwidth] = useState('加载中...')
  const [outBandwidth, setOutBandwidth] = useState('加载中...')

  useEffect(() => {
    // Fetch bandwidth data
    fetchBandwidthData()
  }, [])

  const fetchBandwidthData = async () => {
    // Implement data fetching logic
    setTotalBandwidth('45.2 Mbps')
    setInBandwidth('23.1 Mbps')
    setOutBandwidth('22.1 Mbps')
  }

  const chartOption = {
    title: {
      text: '带宽趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['总带宽', '请求带宽', '响应带宽'],
      top: 30
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
        name: '总带宽',
        type: 'line',
        smooth: true,
        data: [45, 52, 41, 54, 40, 60, 55]
      },
      {
        name: '请求带宽',
        type: 'line',
        smooth: true,
        data: [23, 28, 21, 27, 20, 32, 30]
      },
      {
        name: '响应带宽',
        type: 'line',
        smooth: true,
        data: [22, 24, 20, 27, 20, 28, 25]
      }
    ]
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        带宽分析 (Bandwidth)
      </h2>
      
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
        {/* Total Bandwidth */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">总带宽峰值 (Total)</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_l7Flow_bandwidth">{totalBandwidth}</div>
            <p className="text-xs text-muted-foreground mt-1">访问总带宽峰值</p>
          </div>
        </div>
        
        {/* In Bandwidth */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">请求带宽峰值 (In)</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_l7Flow_inBandwidth">{inBandwidth}</div>
            <p className="text-xs text-muted-foreground mt-1">客户端请求带宽峰值</p>
          </div>
        </div>
        
        {/* Out Bandwidth */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">响应带宽峰值 (Out)</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_l7Flow_outBandwidth">{outBandwidth}</div>
            <p className="text-xs text-muted-foreground mt-1">EdgeOne 响应带宽峰值</p>
          </div>
        </div>
      </div>
      
      {/* Bandwidth Chart */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold leading-none tracking-tight">带宽趋势</h3>
        </div>
        <div className="p-6 pt-0">
          <div id="chart_bandwidth" className="w-full h-[350px]">
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}