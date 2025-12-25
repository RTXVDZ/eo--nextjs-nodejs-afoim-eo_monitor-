'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

export default function RequestsPerformanceSection() {
  const [totalRequests, setTotalRequests] = useState('加载中...')
  const [avgResponseTime, setAvgResponseTime] = useState('加载中...')
  const [avgFirstByteTime, setAvgFirstByteTime] = useState('加载中...')

  useEffect(() => {
    // Fetch requests performance data
    fetchRequestsPerformanceData()
  }, [])

  const fetchRequestsPerformanceData = async () => {
    // Implement data fetching logic
    setTotalRequests('12,345')
    setAvgResponseTime('123.4 ms')
    setAvgFirstByteTime('45.6 ms')
  }

  const requestsChartOption = {
    title: {
      text: '请求数趋势',
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
        name: '请求数',
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210]
      }
    ]
  }

  const performanceChartOption = {
    title: {
      text: '响应耗时趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['平均响应耗时', '平均首字节耗时'],
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
        name: '平均响应耗时',
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '平均首字节耗时',
        type: 'line',
        smooth: true,
        data: [45, 52, 41, 54, 40, 60, 55]
      }
    ]
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        请求与性能 (Requests & Performance)
      </h2>
      
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
        {/* Total Requests */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">总请求数</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_l7Flow_request">{totalRequests}</div>
            <p className="text-xs text-muted-foreground mt-1">总请求次数</p>
          </div>
        </div>
        
        {/* Avg Response Time */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">平均响应耗时</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_l7Flow_avgResponseTime">{avgResponseTime}</div>
            <p className="text-xs text-muted-foreground mt-1">L7 访问平均响应耗时 (ms)</p>
          </div>
        </div>
        
        {/* Avg First Byte Time */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">平均首字节耗时</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_l7Flow_avgFirstByteResponseTime">{avgFirstByteTime}</div>
            <p className="text-xs text-muted-foreground mt-1">L7 访问平均首字节响应耗时 (ms)</p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {/* Requests Chart */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">请求数趋势</h3>
          </div>
          <div className="p-6 pt-0">
            <div id="chart_requests" className="w-full h-[350px]">
              <ReactECharts option={requestsChartOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>
        </div>
        
        {/* Performance Chart */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">响应耗时趋势</h3>
          </div>
          <div className="p-6 pt-0">
            <div id="chart_performance" className="w-full h-[350px]">
              <ReactECharts option={performanceChartOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}