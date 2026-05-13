import React, { useContext } from 'react'
import { StudyContext } from '../../context/StudyContext'
import { Target, Award, Flame } from 'lucide-react'

export default function WeeklyChallenge() {
  const { entries, hoursByDate } = useContext(StudyContext)
  
  // Get current week's data
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay() + 1)
  
  let weekTotal = 0
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    const dateKey = date.toISOString().split('T')[0]
    weekTotal += hoursByDate[dateKey] || 0
  }

  const challenges = [
    { name: '📚 Study Warrior', goal: 10, hours: weekTotal, icon: Flame },
    { name: '🎯 Focus Master', goal: 5, hours: weekTotal, icon: Target },
    { name: '🏆 Streak Legend', goal: 7, hours: Math.min(entries.length, 7), icon: Award }
  ]

  return (
    <div className="card mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="text-yellow-500 w-5 h-5" />
        <h3 className="text-lg font-bold">This Week's Challenges</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map((challenge, idx) => {
          const progress = Math.min((challenge.hours / challenge.goal) * 100, 100)
          const completed = challenge.hours >= challenge.goal
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border-2 transition-all ${
                completed
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-sm">{challenge.name}</p>
                {completed && <span className="text-xl">✓</span>}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl font-bold text-green-600">{challenge.hours.toFixed(1)}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">/ {challenge.goal}h</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${completed ? 'bg-green-500' : 'bg-yellow-500'}`}
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
