import React, { useMemo } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardTitle } from '../ui/Card'
import { getTotalHoursBySubject } from '../../utils/streakUtils'

const COLORS = ['#16a34a', '#15803d', '#22c55e', '#86efac', '#dcfce7', '#7c3aed', '#ec4899', '#f59e0b']

export const SubjectPieChart = ({ entries }) => {
  const data = useMemo(() => {
    const hours = getTotalHoursBySubject(entries, 30)
    return Object.entries(hours).map(([subject, hours]) => ({
      name: subject,
      value: parseFloat(hours.toFixed(1)),
    }))
  }, [entries])

  return (
    <Card>
      <CardContent className="pt-6">
        <CardTitle className="mb-4">Study by Subject (Last 30 Days)</CardTitle>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}h`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}h`} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            No data available
          </div>
        )}
      </CardContent>
    </Card>
  )
}
