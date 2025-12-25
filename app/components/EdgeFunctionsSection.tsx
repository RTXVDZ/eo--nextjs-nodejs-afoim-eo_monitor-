'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

export default function EdgeFunctionsSection() {
  const [functionRequests, setFunctionRequests] = useState('加载中...')
  const [functionCpuTime, setFunctionCpuTime] = useState('加载中...')

  useEffect(() => {
    // Fetch edge functions data
    fetchEdgeFunctionsData()
  }, [])

  const fetchEdgeFunctionsData = async () => {
    // Implement data fetching logic
    setFunctionRequests('12,345')
    setFunctionCpuTime('1,234.5 ms')
  }

  const requestsChartOption = {
    title: {
      text: '函数请求数趋势',
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

  const cpuChartOption = {
    title: {
      text: '函数 CPU 耗时趋势',
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
        name: 'CPU 耗时',
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
        边缘函数 (Edge Functions)
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {/* Function Requests */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">总请求数</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_function_requestCount">{functionRequests}</div>
            <p className="text-xs text-muted-foreground mt-1">Edge Functions 总调用次数</p>
          </div>
        </div>
        
        {/* Function CPU Time */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">总 CPU 时间</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_function_cpuCostTime">{functionCpuTime}</div>
            <p className="text-xs text-muted-foreground mt-1">Edge Functions 总 CPU 耗时 (ms)</p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {/* Function Requests Chart */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">函数请求数趋势</h3>
          </div>
          <div className="p-6 pt-0">
            <div id="chart_function_requests" className="w-full h-[350px]">
              <ReactECharts option={requestsChartOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>
        </div>
        
        {/* Function CPU Chart */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">函数 CPU 耗时趋势</h3>
          </div>
          <div className="p-6 pt-0">
            <div id="chart_function_cpu" className="w-full h-[350px]">
              <ReactECharts option={cpuChartOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}