'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

export default function PagesStatsSection() {
  const [dailyBuild, setDailyBuild] = useState('加载中...')
  const [monthlyBuild, setMonthlyBuild] = useState('加载中...')
  const [cloudFunctionTotal, setCloudFunctionTotal] = useState('加载中...')
  const [monthlyCfRequests, setMonthlyCfRequests] = useState('加载中...')
  const [monthlyCfGbs, setMonthlyCfGbs] = useState('加载中...')

  useEffect(() => {
    // Fetch pages stats data
    fetchPagesStatsData()
  }, [])

  const fetchPagesStatsData = async () => {
    // Implement data fetching logic
    setDailyBuild('12')
    setMonthlyBuild('345')
    setCloudFunctionTotal('6,789')
    setMonthlyCfRequests('12,345')
    setMonthlyCfGbs('45.6')
  }

  const cloudFunctionChartOption = {
    title: {
      text: 'Cloud Functions 请求数趋势',
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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
        Pages 统计 (Pages Stats)
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Daily Build Count */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">当日构建次数</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_pages_daily_build">{dailyBuild}</div>
            <p className="text-xs text-muted-foreground mt-1">Pages 当日构建总次数</p>
          </div>
        </div>
        
        {/* Monthly Build Count */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">当月构建次数</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_pages_monthly_build">{monthlyBuild}</div>
            <p className="text-xs text-muted-foreground mt-1">Pages 当月构建总次数</p>
          </div>
        </div>
        
        {/* Cloud Functions 24h Requests */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">Cloud Functions 24h 请求数</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_pages_cloud_function_total">{cloudFunctionTotal}</div>
            <p className="text-xs text-muted-foreground mt-1">Cloud Functions 24h 总请求数</p>
          </div>
        </div>
        
        {/* Cloud Functions Monthly Requests */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">当月 Cloud Functions 请求数</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_pages_monthly_cf_requests">{monthlyCfRequests}</div>
            <p className="text-xs text-muted-foreground mt-1">本月累计请求数</p>
          </div>
        </div>
        
        {/* Cloud Functions Monthly GBs */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">当月 Cloud Functions GBs</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_pages_monthly_cf_gbs">{monthlyCfGbs}</div>
            <p className="text-xs text-muted-foreground mt-1">本月累计资源使用量 (GBs)</p>
          </div>
        </div>
      </div>
      
      {/* Cloud Function Request Chart */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">Cloud Functions 请求数趋势</h3>
          </div>
          <div className="p-6 pt-0">
            <div id="chart_pages_cloud_function_requests" className="w-full h-[350px]">
              <ReactECharts option={cloudFunctionChartOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}