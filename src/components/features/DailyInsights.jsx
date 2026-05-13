import React, { useContext, useMemo } from 'react'
import { StudyContext } from '../../context/StudyContext'
import { Lightbulb } from 'lucide-react'

export default function DailyInsights() {
  const { entries, hoursByDate, currentStreak, totalStudyDays } = useContext(StudyContext)

  const insights = useMemo(() => {
    const today = new Date()
    const todayKey = today.toISOString().split('T')[0]
    const todayHours = hoursByDate[todayKey] || 0

    let avgDaily = 0
    const daysSinceStart = Math.max(totalStudyDays, 1)
    let totalHours = 0
    Object.values(hoursByDate).forEach(h => (totalHours += h))
    avgDaily = (totalHours / daysSinceStart).toFixed(1)

    const messages = []

    if (todayHours === 0) {
      messages.push('Today is a fresh start! Add your first study session.')
    } else if (todayHours < 2) {
      messages.push(`You studied ${todayHours}h today. Keep the momentum!`)
    } else if (todayHours < 4) {
      messages.push(`Excellent work! ${todayHours}h studied today.`)
    } else {
      messages.push(`Amazing dedication! ${todayHours}h of focused learning today!`)
    }

    if (currentStreak >= 7 && currentStreak % 7 === 0) {
      messages.push(`You just completed ${currentStreak / 7} week(s) of consistent studying!`)
    }

    if (currentStreak > 0 && currentStreak % 10 === 0) {
      messages.push(`🌟 ${currentStreak}-day streak achieved! You're unstoppable!`)
    }

    if (avgDaily > 2) {
      messages.push(`📈 Your average daily study time is ${avgDaily}h - that's impressive!`)
    }

    return messages
  }, [entries, hoursByDate, currentStreak, totalStudyDays])

  if (insights.length === 0) return null

  return (
    <div className="card card-accent p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-[rgba(26,115,232,0.1)] dark:bg-[#1e3a5f] flex items-center justify-center flex-shrink-0">
          <Lightbulb className="text-[var(--primary)] w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="h3 text-[var(--text-primary)] mb-3">Daily Insights</h3>
          <div className="space-y-2">
            {insights.map((insight, idx) => (
              <p key={idx} className="body text-[var(--text-secondary)]">
                {insight}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
