import React, { useState, useContext } from 'react'
import { Card, CardContent, CardTitle } from '../components/ui/Card'
import { StudyContext } from '../context/StudyContext'
import { PomodoroTimer } from '../components/pomodoro/PomodoroTimer'
import { exportToCSV } from '../utils/exportUtils'
import { AlertTriangle, Download, Trash2 } from 'lucide-react'

export const Settings = () => {
  const { settings, updateSettings, clearAllData, entries } = useContext(StudyContext)
  const [confirmClear, setConfirmClear] = useState(false)

  const handleExport = () => {
    exportToCSV(entries)
  }

  const handleClear = () => {
    if (confirmClear) {
      clearAllData()
      setConfirmClear(false)
    } else {
      setConfirmClear(true)
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto space-y-6 page-enter">
      {/* Profile Section */}
      <Card>
        <CardContent className="pt-6">
          <CardTitle className="mb-4">Profile</CardTitle>
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => updateSettings({ name: e.target.value })}
              className="input"
              placeholder="Enter your name"
            />
          </div>
        </CardContent>
      </Card>

      {/* Study Goals */}
      <Card>
        <CardContent className="pt-6">
          <CardTitle className="mb-4">Study Goals</CardTitle>
          <div>
            <label className="label">Weekly Goal (hours)</label>
            <input
              type="number"
              min="1"
              max="168"
              value={settings.weeklyGoalHours}
              onChange={(e) =>
                updateSettings({ weeklyGoalHours: parseInt(e.target.value) })
              }
              className="input"
            />
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              Set your weekly study goal. The dashboard will track your progress.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pomodoro Settings */}
      <Card>
        <CardContent className="pt-6">
          <CardTitle className="mb-4">Pomodoro Timer</CardTitle>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="label">Work Duration (minutes)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={settings.pomodoroWork}
                onChange={(e) =>
                  updateSettings({ pomodoroWork: parseInt(e.target.value) })
                }
                className="input"
              />
            </div>
            <div>
              <label className="label">Break Duration (minutes)</label>
              <input
                type="number"
                min="1"
                max="30"
                value={settings.pomodoroBreak}
                onChange={(e) =>
                  updateSettings({ pomodoroBreak: parseInt(e.target.value) })
                }
                className="input"
              />
            </div>
          </div>
          <div className="max-w-xs">
            <PomodoroTimer />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardContent className="pt-6">
          <CardTitle className="mb-4">Data</CardTitle>
          <div className="space-y-3">
            <button
              onClick={handleExport}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Export Data to CSV
            </button>

            {!confirmClear ? (
              <button
                onClick={handleClear}
                className="btn-ghost w-full flex items-center justify-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <Trash2 size={18} />
                Clear All Data
              </button>
            ) : (
              <div className="p-4 rounded-lg border-2 border-red-500 bg-red-50 dark:bg-red-950">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                      Are you sure?
                    </h4>
                    <p className="text-sm text-red-800 dark:text-red-200">
                      This will permanently delete all study entries. This action cannot be undone.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleClear}
                    className="btn-primary bg-red-600 hover:bg-red-700 flex-1"
                  >
                    Delete Everything
                  </button>
                  <button
                    onClick={() => setConfirmClear(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardContent className="pt-6">
          <CardTitle className="mb-4">About</CardTitle>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            <strong>Study Streak Heatmap</strong> is a productivity dashboard for students
            to track daily study consistency, inspired by GitHub's contribution graph.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
            Built with React, Vite, and Tailwind CSS.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
