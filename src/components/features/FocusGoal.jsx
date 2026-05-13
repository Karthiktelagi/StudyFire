import React, { useContext, useState } from 'react'
import { StudyContext } from '../../context/StudyContext'
import { Target } from 'lucide-react'

export default function FocusGoal() {
  const { hoursByDate } = useContext(StudyContext)
  const [dailyGoal, setDailyGoal] = useState(localStorage.getItem('daily_goal') ? parseFloat(localStorage.getItem('daily_goal')) : 3)
  const [isEditing, setIsEditing] = useState(false)

  const today = new Date().toISOString().split('T')[0]
  const todayHours = hoursByDate[today] || 0
  const goalProgress = Math.min((todayHours / dailyGoal) * 100, 100)

  const handleSaveGoal = (newGoal) => {
    if (newGoal > 0) {
      setDailyGoal(newGoal)
      localStorage.setItem('daily_goal', newGoal)
      setIsEditing(false)
    }
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[rgba(251,188,4,0.1)] dark:bg-[#3a3a2f] flex items-center justify-center">
            <Target className="text-[var(--accent)] w-6 h-6" />
          </div>
          <h3 className="h3 text-[var(--text-primary)]">Today's Focus Goal</h3>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-outlined text-xs"
          >
            Edit
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <p className="caption mb-3">Target</p>
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="number"
                min="0.5"
                step="0.5"
                max="12"
                defaultValue={dailyGoal}
                onBlur={(e) => handleSaveGoal(parseFloat(e.target.value))}
                autoFocus
                className="input flex-1"
              />
              <span className="text-sm text-[var(--text-secondary)]">hours</span>
            </div>
          ) : (
            <p className="text-3xl font-bold text-[var(--accent)]">{dailyGoal}h</p>
          )}
        </div>
        <div>
          <p className="caption mb-3">Progress</p>
          <p className="text-3xl font-bold text-[var(--primary)]">{todayHours}h</p>
        </div>
      </div>

      <div>
        <div className="w-full bg-[#e8eaed] dark:bg-[#3a3a3a] h-2 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${goalProgress}%`,
              background: 'linear-gradient(90deg, #fbbc04 0%, #f29900 100%)',
            }}
          />
        </div>
        <p className="caption mt-3">
          {goalProgress < 100
            ? `${(dailyGoal - todayHours).toFixed(1)}h more to reach your goal!`
            : '🎉 Goal achieved! Great work today!'}
        </p>
      </div>
    </div>
  )
}
