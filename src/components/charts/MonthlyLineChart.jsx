import React, { useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardTitle } from '../ui/Card'
import { getLast30Days, formatDateKey } from '../../utils/dateUtils'
import { getHoursByDate } from '../../utils/streakUtils'

export const MonthlyLineChart = ({ entries }) => {
  const data = useMemo(() => {
    const days = getLast30Days()
    return days.map(date => ({
      date: date.slice(5), // MM-DD format
      fullDate: date,
      hours: getHoursByDate(entries, date),
    }))
  }, [entries])

  const totalHours = data.reduce((sum, day) => sum + day.hours, 0)
  const avgHours = (totalHours / data.length).toFixed(1)

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <CardTitle className="mb-2">Monthly Study Trend</CardTitle>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total: <span className="font-semibold text-green-600 dark:text-green-400">{totalHours.toFixed(1)}h</span> | Average: {avgHours}h/day
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              interval={Math.floor(data.length / 7)}
            />
            <YAxis />
            <Tooltip
              formatter={(value) => `${value}h`}
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Area
              type="monotone"
              dataKey="hours"
              fill="#16a34a"
              stroke="#15803d"
              fillOpacity={0.3}
              dot={{ fill: '#16a34a', r: 3 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
