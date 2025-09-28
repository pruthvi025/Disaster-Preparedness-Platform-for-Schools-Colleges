'use client'

import { useState, useMemo, Fragment, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addDays, subDays, getDay } from 'date-fns'

interface ActivityLog {
  date: string
  active: boolean
}

interface StreakHeatmapProps {
  activityLogs?: ActivityLog[]
  className?: string
}

const StreakHeatmap: React.FC<StreakHeatmapProps> = ({ 
  activityLogs = [], 
  className = "" 
}) => {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const currentMonthRef = useRef<HTMLDivElement>(null)

  // Generate the last 12 months of data with month separators
  const { heatmapData, monthLabels, monthGroups } = useMemo(() => {
    const today = new Date()
    const oneYearAgo = subDays(today, 365)
    const startDate = startOfWeek(oneYearAgo, { weekStartsOn: 0 }) // Start from Sunday
    const endDate = endOfWeek(today, { weekStartsOn: 0 })

    // Generate all days in the range
    const allDays = eachDayOfInterval({ start: startDate, end: endDate })
    
    // Group days by week
    const weeks: Date[][] = []
    let currentWeek: Date[] = []
    
    allDays.forEach((day, index) => {
      if (index % 7 === 0 && currentWeek.length > 0) {
        weeks.push([...currentWeek])
        currentWeek = []
      }
      currentWeek.push(day)
    })
    
    if (currentWeek.length > 0) {
      weeks.push(currentWeek)
    }

    // Generate month groups by analyzing the actual months in the data
    const monthGroups: { month: string; weeks: Date[][]; startWeekIndex: number }[] = []
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    let currentMonth = -1
    let currentMonthWeeks: Date[][] = []
    let monthStartIndex = 0
    
    weeks.forEach((week, weekIndex) => {
      const firstDayOfWeek = week[0]
      const month = firstDayOfWeek.getMonth()
      
      if (month !== currentMonth && currentMonth !== -1) {
        // Save previous month group
        monthGroups.push({
          month: months[currentMonth],
          weeks: [...currentMonthWeeks],
          startWeekIndex: monthStartIndex
        })
        
        // Start new month
        currentMonthWeeks = [week]
        monthStartIndex = weekIndex
        currentMonth = month
      } else if (currentMonth === -1) {
        // First month
        currentMonthWeeks = [week]
        monthStartIndex = weekIndex
        currentMonth = month
      } else {
        // Same month, add to current group
        currentMonthWeeks.push(week)
      }
    })
    
    // Add the last month group
    if (currentMonthWeeks.length > 0) {
      monthGroups.push({
        month: months[currentMonth],
        weeks: [...currentMonthWeeks],
        startWeekIndex: monthStartIndex
      })
    }

    // Generate month labels from the groups
    const monthLabels = monthGroups.map((group, index) => ({
      month: group.month,
      weekIndex: group.startWeekIndex
    }))

    return { heatmapData: weeks, monthLabels, monthGroups }
  }, [activityLogs])

  // Get activity status for a specific date
  const getActivityStatus = (date: Date): 'active' | 'inactive' | 'future' | 'empty' => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const today = new Date()
    
    if (date > today) {
      return 'future'
    }
    
    if (activityLogs.length === 0) {
      return 'empty'
    }
    
    const activity = activityLogs.find(log => log.date === dateStr)
    if (!activity) {
      return 'empty'
    }
    
    return activity.active ? 'active' : 'inactive'
  }

  // Get color class based on activity status
  const getColorClass = (status: 'active' | 'inactive' | 'future' | 'empty'): string => {
    switch (status) {
      case 'active':
        return 'bg-green-500 hover:bg-green-600'
      case 'inactive':
        return 'bg-red-500 hover:bg-red-600'
      case 'future':
        return 'bg-gray-200 hover:bg-gray-300'
      case 'empty':
        return 'bg-gray-100 hover:bg-gray-200'
      default:
        return 'bg-gray-100'
    }
  }

  // Get tooltip text
  const getTooltipText = (date: Date, status: 'active' | 'inactive' | 'future' | 'empty'): string => {
    const dateStr = format(date, 'MMM dd, yyyy')
    
    switch (status) {
      case 'active':
        return `${dateStr} – Active`
      case 'inactive':
        return `${dateStr} – Inactive`
      case 'future':
        return `${dateStr} – Future`
      case 'empty':
        return `${dateStr} – No activity`
      default:
        return dateStr
    }
  }

  // Calculate streak statistics
  const streakStats = useMemo(() => {
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    
    const today = new Date()
    const sortedLogs = [...activityLogs].sort((a, b) => b.date.localeCompare(a.date))
    
    // Calculate current streak
    for (const log of sortedLogs) {
      const logDate = new Date(log.date)
      if (logDate > today) continue
      
      if (log.active) {
        currentStreak++
      } else {
        break
      }
    }
    
    // Calculate longest streak
    for (const log of sortedLogs) {
      if (log.active) {
        tempStreak++
        longestStreak = Math.max(longestStreak, tempStreak)
      } else {
        tempStreak = 0
      }
    }
    
    return { currentStreak, longestStreak }
  }, [activityLogs])

  // Auto-scroll to current month on mount
  useEffect(() => {
    const scrollToCurrentMonth = () => {
      if (currentMonthRef.current && scrollContainerRef.current) {
        const isMobile = window.innerWidth < 768
        currentMonthRef.current.scrollIntoView({
          behavior: 'smooth',
          inline: isMobile ? 'start' : 'center',
          block: 'nearest'
        })
      }
    }

    // Small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(scrollToCurrentMonth, 100)
    
    return () => clearTimeout(timeoutId)
  }, [monthGroups])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-xl shadow-lg p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">📅</span>
            <h3 className="text-xl font-bold text-gray-900">Streak Tracker</h3>
          </div>
          <p className="text-sm text-gray-600">Consistency builds resilience!</p>
        </div>
        
        {/* Stats - Top right */}
        <div className="flex gap-6">
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">{streakStats.currentStreak}</div>
            <div className="text-xs text-gray-500">Current</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{streakStats.longestStreak}</div>
            <div className="text-xs text-gray-500">Longest</div>
          </div>
        </div>
      </div>

      {/* GitHub-style Heatmap */}
      <div className="mb-6">
        {/* Year Label */}
        <div className="mb-2">
          <span className="text-sm font-semibold text-gray-700">
            {new Date().getFullYear()}
          </span>
        </div>

        {/* Heatmap Grid */}
        <div ref={scrollContainerRef} className="overflow-x-auto">
          <div className="inline-block min-w-max">
            <div className="grid grid-cols-[auto,1fr] gap-2">
              {/* Left Column: Empty space for month labels + Day labels */}
              <div className="flex flex-col gap-[3px] pr-3">
                {/* Empty space for month labels */}
                <div className="h-4 sm:h-5"></div>
                
                {/* Day Labels */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <div key={day} className="h-4 sm:h-5 flex items-center justify-end">
                    <span className="text-xs text-gray-500 font-medium">
                      {day}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right Column: Month labels + Heatmap Grid with separations */}
              <div className="flex flex-col gap-[3px]">
                {/* Month Labels Row */}
                <div className="flex gap-[3px] relative">
                  {monthGroups.map(({ month, weeks }, groupIndex) => {
                    const currentMonth = new Date().getMonth()
                    const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(month)
                    const isCurrentMonth = monthIndex === currentMonth
                    
                    return (
                      <Fragment key={month}>
                        {groupIndex > 0 && (
                          // Month separator gap
                          <div className="w-2 h-4 sm:h-5 bg-transparent"></div>
                        )}
                        <div 
                          ref={isCurrentMonth ? currentMonthRef : null}
                          className="flex items-center justify-start"
                          style={{ 
                            width: `${weeks.length * 20 + (weeks.length - 1) * 3}px` 
                          }}
                        >
                          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                            {month}
                          </span>
                        </div>
                      </Fragment>
                    )
                  })}
                </div>

                {/* Heatmap Grid with Month Separations */}
                <div className="flex gap-[3px]">
                  {monthGroups.map(({ month, weeks }, groupIndex) => (
                    <Fragment key={month}>
                      {groupIndex > 0 && (
                        // Month separator gap
                        <div className="w-2 h-full bg-transparent"></div>
                      )}
                      <div className="flex gap-[3px]">
                        {/* Month's weeks */}
                        {weeks.map((week, weekIndex) => (
                          <div key={`${month}-${weekIndex}`} className="flex flex-col gap-[3px]">
                            {week.map((day, dayIndex) => {
                              const status = getActivityStatus(day)
                              const isHovered = hoveredDate === format(day, 'yyyy-MM-dd')
                              
                              return (
                                <motion.div
                                  key={`${month}-${weekIndex}-${dayIndex}`}
                                  whileHover={{ scale: 1.1 }}
                                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-[4px] cursor-pointer transition-all duration-200 ${getColorClass(status)} ${
                                    isHovered ? 'ring-2 ring-blue-400' : ''
                                  }`}
                                  onMouseEnter={() => setHoveredDate(format(day, 'yyyy-MM-dd'))}
                                  onMouseLeave={() => setHoveredDate(null)}
                                  title={getTooltipText(day, status)}
                                />
                              )
                            })}
                          </div>
                        ))}
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend - Bottom center */}
      <div className="flex items-center justify-center gap-4 text-xs mt-4">
        <span className="text-gray-500">Less</span>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-100 rounded-[4px]"></div>
          <div className="w-3 h-3 bg-gray-200 rounded-[4px]"></div>
          <div className="w-3 h-3 bg-green-500 rounded-[4px]"></div>
          <div className="w-3 h-3 bg-red-500 rounded-[4px]"></div>
        </div>
        <span className="text-gray-500">More</span>
      </div>

      {/* Tooltip */}
      {hoveredDate && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute z-10 bg-gray-900 text-white text-xs rounded px-2 py-1 pointer-events-none"
          style={{
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          {hoveredDate}
        </motion.div>
      )}
    </motion.div>
  )
}

export default StreakHeatmap
