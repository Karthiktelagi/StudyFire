import React, { useState, useContext } from 'react'
import { Card, CardContent, CardTitle } from '../components/ui/Card'
import { Heatmap } from '../components/heatmap/Heatmap'
import { StudyLogForm } from '../components/forms/StudyLogForm'
import { StudyContext } from '../context/StudyContext'
import { useStreak } from '../hooks/useStreak'
import { getMotivationalMessage } from '../utils/achievementUtils'
import { Plus, Flame, Trophy, BookOpen, Zap } from 'lucide-react'
import QuickStudy from '../components/features/QuickStudy'
import WeeklyChallenge from '../components/features/WeeklyChallenge'
import MilestoneTracker from '../components/features/MilestoneTracker'
import SubjectPerformance from '../components/features/SubjectPerformance'
import DailyInsights from '../components/features/DailyInsights'
import FocusGoal from '../components/features/FocusGoal'
import StreakShare from '../components/features/StreakShare'

export const Dashboard = () => {
  const { entries, getTodayEntries } = useContext(StudyContext)
  const streak = useStreak(entries)
  const [showForm, setShowForm] = useState(false)
  
  const todayEntries = getTodayEntries()
  const motivational = getMotivationalMessage(streak.currentStreak)

  return (
    <div className="w-full bg-white dark:bg-[#1a1a1a]">
      {/* Hero Section */}
      <div className="gradient-hero dark:bg-gradient-to-br dark:from-[#1a3a3a] dark:to-[#2a2a2a] relative overflow-hidden">
        <div className="gradient-floating-shapes absolute inset-0" />
        <div className="px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24 max-w-7xl mx-auto">
          <h1 className="display text-[var(--text-primary)]">
            Welcome to StudyFire
          </h1>
          <p className="caption mt-3 text-base">
            Master consistency, unlock your potential
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 animate-stagger max-w-7xl mx-auto">
        {/* Daily Insights */}
        <DailyInsights />

        {/* Quick Study */}
        <QuickStudy />

        {/* Focus Goal */}
        <FocusGoal />

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Current Streak',
              value: streak.currentStreak,
              icon: Flame,
              color: 'text-orange-500',
            },
            {
              title: 'Longest Streak',
              value: streak.longestStreak,
              icon: Trophy,
              color: 'text-yellow-500',
            },
            {
              title: 'Study Days',
              value: streak.totalStudyDays,
              icon: BookOpen,
              color: 'text-[var(--success)]',
            },
            {
              title: 'Productivity',
              value: `${streak.productivityPercent}%`,
              icon: Zap,
              color: 'text-[var(--primary)]',
            },
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="card p-6 animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#e8f0fe] dark:bg-[#1e3a5f] flex items-center justify-center">
                    <Icon className={`${stat.color}`} size={24} />
                  </div>
                </div>
                <p className="caption mb-2">{stat.title}</p>
                <p className="text-2xl font-bold text-[var(--text-primary)]">
                  {stat.value}
                </p>
              </div>
            )
          })}
        </div>

        {/* Today's Panel */}
        <div className="card card-accent p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="h3 text-[var(--text-primary)]">Today's Study</h2>
              <p className="caption mt-1">
                {motivational.message}
              </p>
            </div>
            <span className="text-4xl">{motivational.emoji}</span>
          </div>

          {todayEntries.length > 0 ? (
            <div className="space-y-4 mb-6">
              {todayEntries.map(entry => (
                <div
                  key={entry.id}
                  className="p-4 rounded-lg bg-[var(--surface-alt)] dark:bg-[#2d2d2d] border border-[var(--border)]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">
                        {entry.subject}
                      </p>
                      <p className="caption mt-1">
                        {entry.hours} hours {entry.notes && `• ${entry.notes}`}
                      </p>
                    </div>
                    {entry.completed && (
                      <span className="badge badge-success">✓ Completed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="caption mb-6">
              No study logged yet
            </p>
          )}

          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary w-full"
          >
            <Plus size={18} />
            Log Study Session
          </button>
        </div>

        {/* Weekly Challenges */}
        <WeeklyChallenge />

        {/* Milestone Tracker */}
        <MilestoneTracker />

        {/* Subject Performance */}
        <SubjectPerformance />

        {/* Streak Share */}
        <StreakShare />

        {/* Heatmap */}
        <div className="card p-6">
          <h2 className="h3 text-[var(--text-primary)] mb-6">Study Consistency</h2>
          <Heatmap entries={entries} />
        </div>
      </div>

      {/* Form Modal */}
      <StudyLogForm isOpen={showForm} onClose={() => setShowForm(false)} />
    </div>
  )
}
