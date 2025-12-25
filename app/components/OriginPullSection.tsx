'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

export default function OriginPullSection() {
  const [outFluxHy, setOutFluxHy] = useState('加载中...')
  const [requestHy, setRequestHy] = useState('加载中...')
  const [outBandwidthHy, setOutBandwidthHy] = useState('加载中...')
  const [inFluxHy, setInFluxHy] = useState('加载中...')
  const [inBandwidthHy, setInBandwidthHy] = useState('加载中...')
  const [cacheHitRate, setCacheHitRate] = useState('加载中...')

  useEffect(() => {
    // Fetch origin pull data
    fetchOriginPullData()
  }, [])

  const fetchOriginPullData = async () => {
    // Implement data fetching logic
    setOutFluxHy('123.4 MB')
    setRequestHy('1,234')
    setOutBandwidthHy('12.3 Mbps')
    setInFluxHy('456.7 MB')
    setInBandwidthHy('45.6 Mbps')
    setCacheHitRate('89.5%')
  }

  const chartOption = {
    title: {
      text: '回源趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['回源请求流量', '回源响应流量', '回源请求数'],
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
    series: [
      {
        name: '回源请求流量',
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '回源响应流量',
        type: 'line',
        smooth: true,
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '回源请求数',
        type: 'line',
        smooth: true,
        data: [150, 232, 201, 154, 190, 330, 410],
        yAxisIndex: 1
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '流量 (MB)'
      },
      {
        type: 'value',
        name: '请求数',
        position: 'right'
      }
    ]
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
        </svg>
        回源分析 (Origin Pull Analysis)
      </h2>
      
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
        {/* Origin Out Flux */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">回源请求流量</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_l7Flow_outFlux_hy">{outFluxHy}</div>
            <p className="text-xs text-muted-foreground mt-1">EdgeOne 节点至源站</p>
          </div>
        </div>
        
        {/* Origin Requests */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">回源请求数</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_l7Flow_request_hy">{requestHy}</div>
            <p className="text-xs text-muted-foreground mt-1">EdgeOne 节点至源站</p>
          </div>
        </div>
        
        {/* Origin Out Bandwidth */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">回源请求带宽峰值</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_l7Flow_outBandwidth_hy">{outBandwidthHy}</div>
            <p className="text-xs text-muted-foreground mt-1">EdgeOne 节点至源站</p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
        {/* Origin In Flux */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">回源响应流量</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_l7Flow_inFlux_hy">{inFluxHy}</div>
            <p className="text-xs text-muted-foreground mt-1">源站至 EdgeOne 节点</p>
          </div>
        </div>
        
        {/* Origin In Bandwidth */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">回源响应带宽峰值</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_l7Flow_inBandwidth_hy">{inBandwidthHy}</div>
            <p className="text-xs text-muted-foreground mt-1">源站至 EdgeOne 节点</p>
          </div>
        </div>
        
        {/* Cache Hit Rate */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-muted-foreground">缓存命中率</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold" id="kpi_cache_hit_rate">{cacheHitRate}</div>
            <p className="text-xs text-muted-foreground mt-1">1 - (源站响应 / EdgeOne 响应)</p>
          </div>
        </div>
      </div>
      
      {/* Origin Pull Chart */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold leading-none tracking-tight">回源趋势</h3>
        </div>
        <div className="p-6 pt-0">
          <div id="chart_origin_pull" className="w-full h-[350px]">
            <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}