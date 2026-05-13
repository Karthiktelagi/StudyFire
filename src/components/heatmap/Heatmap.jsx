import React from 'react'
import { HeatmapCell } from './HeatmapCell'
import { HeatmapLegend } from './HeatmapLegend'
import { getWeeksArray, getYearStart, formatDateKey, getMonthAbbr, getWeekdayLetter } from '../../utils/dateUtils'
import { getHoursByDate } from '../../utils/streakUtils'

export const Heatmap = ({ entries }) => {
  const today = new Date()
  const yearStart = getYearStart()
  
  const weeks = getWeeksArray(yearStart, today)
  
  // Group weeks by month to add month labels
  const monthLabels = {}
  weeks.forEach((week, weekIndex) => {
    const month = getMonthAbbr(week[0])
    if (!monthLabels[month]) {
      monthLabels[month] = weekIndex
    }
  })

  return (
    <div className="overflow-x-auto">
      <div className="inline-block">
        {/* Month labels */}
        <div className="flex gap-1 ml-12 mb-2">
          {weeks.map((week, weekIndex) => {
            const month = getMonthAbbr(week[0])
            const isFirstOfMonth = !monthLabels[month] || monthLabels[month] === weekIndex
            return (
              <div key={weekIndex} className="w-7">
                {isFirstOfMonth && (
                  <div className="text-xs font-medium text-[var(--text-secondary)] h-4">
                    {month}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Heatmap grid */}
        <div className="flex gap-1">
          {/* Weekday labels */}
          <div className="flex flex-col gap-1 text-xs font-medium text-[var(--text-secondary)] pr-2">
            <div className="h-3" /> {/* Align with first week */}
            {['M', 'W', 'F'].map((day, idx) => (
              <div key={idx} className="h-3 flex items-center">
                {day}
              </div>
            ))}
            <div className="h-3" />
            <div className="h-3" />
            <div className="h-3" />
            <div className="h-3" />
          </div>

          {/* Weeks */}
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((date, dayIndex) => {
                  const dateKey = formatDateKey(date)
                  const hours = getHoursByDate(entries, dateKey)
                  
                  // Show weekday labels for specific rows
                  if (weekIndex === 0 && dayIndex === 0) {
                    return null // Skip Sunday of first week
                  }

                  return (
                    <HeatmapCell
                      key={dateKey}
                      date={dateKey}
                      hours={hours}
                      entries={entries}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <HeatmapLegend />
    </div>
  )
}
