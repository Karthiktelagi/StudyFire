import React, { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'
import { Card, CardContent, CardTitle } from '../ui/Card'
import { getLastWeekDays, formatDateKey } from '../../utils/dateUtils'
import { getHoursByDate } from '../../utils/streakUtils'

export const WeeklyBarChart = ({ entries, weeklyGoal = 15 }) => {
  const data = useMemo(() => {
    const days = getLastWeekDays()
    return days.map(day => ({
      date: day.shortDay,
      fullDate: day.date,
      hours: getHoursByDate(entries, day.date),
    }))
  }, [entries])

  const total = data.reduce((sum, day) => sum + day.hours, 0)

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <CardTitle className="mb-2">Weekly Study Hours</CardTitle>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total this week: <span className="font-semibold text-green-600 dark:text-green-400">{total.toFixed(1)}h</span> / Goal: {weeklyGoal}h
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis dataKey="date" />
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
            <ReferenceLine
              y={weeklyGoal / 7}
              stroke="#10b981"
              strokeDasharray="5 5"
              label={{ value: 'Daily Goal', position: 'insideTopRight', offset: -5 }}
            />
            <Bar dataKey="hours" fill="#16a34a" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
