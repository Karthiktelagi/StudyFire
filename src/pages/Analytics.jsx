import React, { useContext } from 'react'
import { SubjectPieChart } from '../components/charts/SubjectPieChart'
import { WeeklyBarChart } from '../components/charts/WeeklyBarChart'
import { MonthlyLineChart } from '../components/charts/MonthlyLineChart'
import { Card, CardContent, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { StudyContext } from '../context/StudyContext'
import { useStreak } from '../hooks/useStreak'
import { getUnlockedAchievements, ACHIEVEMENTS } from '../utils/achievementUtils'

export const Analytics = () => {
  const { entries, settings } = useContext(StudyContext)
  const streak = useStreak(entries)
  const unlockedAchievements = getUnlockedAchievements(entries, streak.currentStreak)
  const achievementIds = new Set(unlockedAchievements.map(a => a.id))

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-8 page-enter">
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SubjectPieChart entries={entries} />
        <WeeklyBarChart entries={entries} weeklyGoal={settings.weeklyGoalHours} />
      </div>

      <div className="lg:col-span-full w-full">
        <MonthlyLineChart entries={entries} />
      </div>

      {/* Achievements */}
      <Card>
        <CardContent className="pt-6">
          <CardTitle className="mb-6">Achievements</CardTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(ACHIEVEMENTS).map(achievement => {
              const isUnlocked = achievementIds.has(achievement.id)
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    isUnlocked
                      ? 'border-green-500 bg-green-50 dark:bg-green-950'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-3xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {achievement.name}
                      </h4>
                      {isUnlocked && (
                        <Badge variant="success" size="sm">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
