'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

interface MapDataItem {
  name: string
  value: number
}

export default function TopAnalysisSection() {
  const [worldMapData, setWorldMapData] = useState<MapDataItem[]>([])
  const [countryData, setCountryData] = useState<MapDataItem[]>([])

  useEffect(() => {
    // Fetch top analysis data
    fetchTopAnalysisData()
  }, [])

  const fetchTopAnalysisData = async () => {
    // Implement data fetching logic
    // This is placeholder data
    setWorldMapData([
      { name: 'China', value: 100 },
      { name: 'United States', value: 80 },
      { name: 'Japan', value: 60 },
      { name: 'Germany', value: 40 },
      { name: 'United Kingdom', value: 30 }
    ])
    
    setCountryData([
      { name: '中国', value: 100 },
      { name: '美国', value: 80 },
      { name: '日本', value: 60 },
      { name: '德国', value: 40 },
      { name: '英国', value: 30 },
      { name: '法国', value: 25 },
      { name: '韩国', value: 20 },
      { name: '澳大利亚', value: 15 },
      { name: '加拿大', value: 10 },
      { name: '巴西', value: 5 }
    ])
  }

  const worldMapOption = {
    title: {
      text: '全球请求分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    },
    visualMap: {
      min: 0,
      max: 100,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      calculable: true
    },
    series: [
      {
        name: '请求量',
        type: 'map',
        mapType: 'world',
        roam: true,
        emphasis: {
          label: {
            show: true
          }
        },
        data: worldMapData
      }
    ]
  }

  const countryChartOption = {
    title: {
      text: '国家/地区流量排行',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: countryData.map(item => item.name).reverse()
    },
    series: [
      {
        name: '流量',
        type: 'bar',
        data: countryData.map(item => item.value).reverse()
      }
    ]
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
        TOP 分析 (Top Analysis)
      </h2>
      
      {/* World Map */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold leading-none tracking-tight">全球请求分布</h3>
        </div>
        <div className="p-6 pt-0">
          <div id="chart_top_map" className="w-full h-[500px]">
            <ReactECharts option={worldMapOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {/* Country */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">国家/地区流量排行</h3>
          </div>
          <div className="p-6 pt-0">
            <div id="chart_top_country" className="w-full h-[500px]">
              <ReactECharts option={countryChartOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}