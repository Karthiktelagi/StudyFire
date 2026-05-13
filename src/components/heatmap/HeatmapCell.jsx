import React from 'react'
import { Tooltip } from '../ui/Tooltip'
import { getHoursByDate, getSubjectsByDate } from '../../utils/streakUtils'

export const HeatmapCell = ({ date, hours, entries }) => {
  const getColorStyle = (hours) => {
    if (hours === 0) return '#f8f9fa'
    if (hours < 1) return '#c6f6d5'
    if (hours < 2) return '#84e6b8'
    if (hours < 4) return '#188038'
    return '#105221'
  }

  const getHoverColor = (hours) => {
    if (hours === 0) return '#e0e0e0'
    if (hours < 1) return '#a8efd7'
    if (hours < 2) return '#5fd4a4'
    if (hours < 4) return '#0f7639'
    return '#0a3a1a'
  }

  const subjects = getSubjectsByDate(entries, date)
  const tooltipContent = `${date}\n${hours.toFixed(1)}h\n${subjects.join(', ') || 'No study'}`

  return (
    <Tooltip content={tooltipContent} position="top">
      <div
        className="heatmap-cell w-3 h-3 rounded-sm cursor-pointer transition-all hover:scale-125"
        style={{
          backgroundColor: getColorStyle(hours),
          border: '1px solid var(--border)',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = getHoverColor(hours)
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = getColorStyle(hours)
        }}
        title={tooltipContent}
      />
    </Tooltip>
  )
}
