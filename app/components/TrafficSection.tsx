'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

export default function TrafficSection() {
  const [totalTraffic, setTotalTraffic] = useState('加载中...')
  const [inTraffic, setInTraffic] = useState('加载中...')
  const [outTraffic, setOutTraffic] = useState('加载中...')

  useEffect(() => {
    // Fetch traffic data
    fetchTrafficData()
  }, [])

  const fetchTrafficData = async () => {
    // Implement data fetching logic
    // This is a placeholder - actual implementation will fetch from API
    setTotalTraffic('897.3 MB')
    setInTraffic('455.2 MB')
    setOutTraffic('442.1 MB')
  }

  const chartOption = {
    title: {
      text: '流量趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['总流量', '请求流量', '响应流量'],
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
        name: '总流量',
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '请求流量',
        type: 'line',
        smooth: true,
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '响应流量',
        type: 'line',
        smooth: true,
        data: [150, 232, 201, 154, 190, 330, 410]
      }
    ]
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
        </svg>
        流量分析 (Traffic)
      </h2>
      
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
        {/* Total Traffic Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">总流量 (Total)</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_l7Flow_flux">{totalTraffic}</div>
            <p className="text-xs text-muted-foreground mt-1">访问总流量</p>
          </div>
        </div>
        
        {/* Client Request Traffic */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">客户端请求流量 (In)</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_l7Flow_inFlux">{inTraffic}</div>
            <p className="text-xs text-muted-foreground mt-1">客户端请求流量</p>
          </div>
        </div>
        
        {/* EdgeOne Response Traffic */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">响应流量 (Out)</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_l7Flow_outFlux">{outTraffic}</div>
            <p className="text-xs text-muted-foreground mt-1">EdgeOne 响应流量</p>
          </div>
        </div>
      </div>
      
      {/* Traffic Chart */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold leading-none tracking-tight">流量趋势</h3>
        </div>
        <div className="p-6 pt-0">
          <div id="chart_traffic" className="w-full h-[350px]">
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}