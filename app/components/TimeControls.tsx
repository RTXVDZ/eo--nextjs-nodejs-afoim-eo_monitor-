'use client'

import { useState, useEffect } from 'react'

export default function TimeControls() {
  const [zones, setZones] = useState<Array<{ZoneId: string, ZoneName: string}>>([])
  const [showCustomInputs, setShowCustomInputs] = useState(false)
  const [customDays, setCustomDays] = useState('')
  const [customHours, setCustomHours] = useState('')
  const [customMinutes, setCustomMinutes] = useState('')
  const [customSeconds, setCustomSeconds] = useState('')
  const [timeRangeError, setTimeRangeError] = useState('')

  useEffect(() => {
    fetchZones()
  }, [])

  const fetchZones = async () => {
    try {
      const response = await fetch('/api/zones')
      const result = await response.json()
      if (result.Zones) {
        setZones(result.Zones)
      }
    } catch (err) {
      console.error("Error fetching zones:", err)
    }
  }

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setShowCustomInputs(value === 'custom')
    if (value !== 'custom') {
      refreshData()
    }
  }

  const refreshData = () => {
    // This will be implemented to refresh all charts and data
    console.log('Refreshing data...')
  }

  const applyCustomTime = () => {
    const days = parseInt(customDays) || 0
    const hours = parseInt(customHours) || 0
    const minutes = parseInt(customMinutes) || 0
    const seconds = parseInt(customSeconds) || 0

    const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds
    
    if (totalSeconds === 0) {
      setTimeRangeError('请至少输入一个非零值')
      return
    }

    if (totalSeconds > 31 * 86400) {
      setTimeRangeError('时间范围不能超过31天')
      return
    }

    setTimeRangeError('')
    refreshData()
  }

  return (
    <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
      <div className="flex items-center space-x-2">
        <label htmlFor="timeRange" className="text-sm font-medium">时间范围:</label>
        <select 
          id="timeRange" 
          onChange={handleTimeRangeChange}
          className="h-9 w-[180px] rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-900"
        >
          <option value="30min">近 30 分钟</option>
          <option value="1h">近 1 小时</option>
          <option value="6h">近 6 小时</option>
          <option value="today">今日</option>
          <option value="yesterday">昨日</option>
          <option value="3d">近 3 天</option>
          <option value="7d">近 7 天</option>
          <option value="14d">近 14 天</option>
          <option value="31d">近 31 天</option>
          <option value="custom">自定义</option>
        </select>
      </div>

      {/* Custom Time Inputs */}
      <div id="customTimeInputs" className={`${showCustomInputs ? 'flex' : 'hidden'} flex-wrap items-center gap-2 mt-2 w-full sm:w-auto`}>
        <div className="flex items-center space-x-1">
          <input 
            type="number" 
            id="customDays" 
            placeholder="0" 
            value={customDays}
            onChange={(e) => setCustomDays(e.target.value)}
            className="h-8 w-16 rounded-md border border-slate-200 px-2 text-sm" 
            min="0" 
            max="31"
          />
          <span className="text-xs">天</span>
        </div>
        <div className="flex items-center space-x-1">
          <input 
            type="number" 
            id="customHours" 
            placeholder="0" 
            value={customHours}
            onChange={(e) => setCustomHours(e.target.value)}
            className="h-8 w-16 rounded-md border border-slate-200 px-2 text-sm" 
            min="0" 
            max="23"
          />
          <span className="text-xs">小时</span>
        </div>
        <div className="flex items-center space-x-1">
          <input 
            type="number" 
            id="customMinutes" 
            placeholder="0" 
            value={customMinutes}
            onChange={(e) => setCustomMinutes(e.target.value)}
            className="h-8 w-16 rounded-md border border-slate-200 px-2 text-sm" 
            min="0" 
            max="59"
          />
          <span className="text-xs">分</span>
        </div>
        <div className="flex items-center space-x-1">
          <input 
            type="number" 
            id="customSeconds" 
            placeholder="0" 
            value={customSeconds}
            onChange={(e) => setCustomSeconds(e.target.value)}
            className="h-8 w-16 rounded-md border border-slate-200 px-2 text-sm" 
            min="0" 
            max="59"
          />
          <span className="text-xs">秒</span>
        </div>
        <button 
          onClick={applyCustomTime}
          className="h-8 px-3 bg-slate-900 text-white rounded-md text-xs hover:bg-slate-800"
        >
          应用
        </button>
        <span id="timeRangeError" className="text-red-500 text-xs font-medium ml-2">
          {timeRangeError}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="interval" className="text-sm font-medium">粒度:</label>
        <select 
          id="interval" 
          onChange={refreshData}
          className="h-9 w-[180px] rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-900"
        >
          <option value="auto" selected>自动</option>
          <option value="min">1 分钟</option>
          <option value="5min">5 分钟</option>
          <option value="hour">1 小时</option>
          <option value="day">1 天</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="zoneId" className="text-sm font-medium">选择站点:</label>
        <select 
          id="zoneId" 
          onChange={refreshData}
          className="h-9 w-[240px] rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-900"
        >
          <option value="*">加载中...</option>
          {zones.map((zone) => (
            <option key={zone.ZoneId} value={zone.ZoneId}>
              {zone.ZoneName} ({zone.ZoneId})
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}