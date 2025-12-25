'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Header from './components/Header'
import TimeControls from './components/TimeControls'
import TrafficSection from './components/TrafficSection'
import BandwidthSection from './components/BandwidthSection'
import OriginPullSection from './components/OriginPullSection'
import EdgeFunctionsSection from './components/EdgeFunctionsSection'
import PagesStatsSection from './components/PagesStatsSection'
import RequestsPerformanceSection from './components/RequestsPerformanceSection'
import SecuritySection from './components/SecuritySection'
import TopAnalysisSection from './components/TopAnalysisSection'
import LoadingProgress from './components/LoadingProgress'

// Dynamically import ECharts to avoid SSR issues
const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

export default function Home() {
  const [config, setConfig] = useState({ siteName: '', siteIcon: '' })
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/config')
      const configData = await response.json()
      setConfig(configData)
      if (configData.siteName) {
        document.title = configData.siteName
      }
    } catch (err) {
      console.error("Error fetching config:", err)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <LoadingProgress progress={loadingProgress} />
      
      <div className="max-w-7xl mx-auto space-y-8">
        <Header siteName={config.siteName} />
        <TimeControls />
        
        <TrafficSection />
        <BandwidthSection />
        <OriginPullSection />
        <EdgeFunctionsSection />
        <PagesStatsSection />
        <RequestsPerformanceSection />
        <SecuritySection />
        <TopAnalysisSection />
      </div>
    </div>
  )
}