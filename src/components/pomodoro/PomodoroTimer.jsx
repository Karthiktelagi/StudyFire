import React, { useContext } from 'react'
import { Card, CardContent, CardTitle } from '../ui/Card'
import { usePomodoro } from '../../hooks/usePomodoro'
import { StudyContext } from '../../context/StudyContext'
import { Play, Pause, RotateCcw } from 'lucide-react'

export const PomodoroTimer = () => {
  const { settings } = useContext(StudyContext)
  const timer = usePomodoro(settings.pomodoroWork, settings.pomodoroBreak)

  return (
    <Card className="w-full">
      <CardContent>
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-6">
            {/* SVG circle progress */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="55"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="60"
                cy="60"
                r="55"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-green-500"
                strokeDasharray={`${2 * Math.PI * 55}`}
                strokeDashoffset={`${2 * Math.PI * 55 * (1 - timer.progress)}`}
                style={{ transition: 'stroke-dashoffset 0.3s linear' }}
              />
            </svg>

            {/* Time display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-mono font-bold text-gray-900 dark:text-white">
                {String(timer.minutes).padStart(2, '0')}:{String(timer.seconds).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {timer.isWorkPhase ? 'Work' : 'Break'}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2 justify-center mb-4">
            <button
              onClick={timer.start}
              disabled={timer.isRunning}
              className="btn-primary disabled:opacity-50"
            >
              <Play size={16} />
            </button>
            <button
              onClick={timer.pause}
              disabled={!timer.isRunning}
              className="btn-secondary disabled:opacity-50"
            >
              <Pause size={16} />
            </button>
            <button
              onClick={timer.reset}
              className="btn-secondary"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          {/* Sessions completed */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Sessions completed: <span className="font-semibold">{timer.sessionsCompleted}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
