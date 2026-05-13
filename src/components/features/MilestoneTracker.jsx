import React, { useContext } from 'react'
import { StudyContext } from '../../context/StudyContext'
import { Star } from 'lucide-react'

export default function MilestoneTracker() {
  const { currentStreak, longestStreak, totalStudyDays } = useContext(StudyContext)

  const milestones = [
    { label: '1 Week', value: 7, current: currentStreak, color: 'blue' },
    { label: '2 Weeks', value: 14, current: currentStreak, color: 'purple' },
    { label: '1 Month', value: 30, current: currentStreak, color: 'pink' },
    { label: '100 Days', value: 100, current: totalStudyDays, color: 'yellow' },
    { label: '6 Months', value: 180, current: totalStudyDays, color: 'orange' },
    { label: '1 Year', value: 365, current: totalStudyDays, color: 'red' }
  ]

  return (
    <div className="card mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Star className="text-yellow-500 w-5 h-5" />
        <h3 className="text-lg font-bold">Milestones</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {milestones.map((milestone, idx) => {
          const completed = milestone.current >= milestone.value
          const progress = Math.min((milestone.current / milestone.value) * 100, 100)
          
          return (
            <div
              key={idx}
              className={`p-3 rounded-lg border-2 transition-all ${
                completed
                  ? `border-${milestone.color}-500 bg-${milestone.color}-50 dark:bg-${milestone.color}-900/30`
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold">{milestone.label}</p>
                {completed && <span className="text-sm">🏆</span>}
              </div>
              <p className="text-xl font-bold mb-2">
                <span className={`text-${milestone.color}-600`}>{milestone.current}</span>
                <span className="text-xs text-gray-500 ml-1">/{milestone.value}</span>
              </p>
              <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div
                  className={`h-full bg-${milestone.color}-500 transition-all`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
