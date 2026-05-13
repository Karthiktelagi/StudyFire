import React, { useContext, useMemo } from 'react'
import { StudyContext } from '../../context/StudyContext'
import { TrendingUp } from 'lucide-react'

export default function SubjectPerformance() {
  const { entries } = useContext(StudyContext)

  const performance = useMemo(() => {
    const subjectData = {}
    entries.forEach(entry => {
      if (!subjectData[entry.subject]) {
        subjectData[entry.subject] = { hours: 0, sessions: 0 }
      }
      subjectData[entry.subject].hours += entry.hours
      subjectData[entry.subject].sessions += 1
    })

    return Object.entries(subjectData)
      .map(([subject, data]) => ({
        subject,
        ...data,
        avgPerSession: (data.hours / data.sessions).toFixed(1)
      }))
      .sort((a, b) => b.hours - a.hours)
      .slice(0, 5)
  }, [entries])

  if (performance.length === 0) return null

  return (
    <div className="card mb-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-blue-500 w-5 h-5" />
        <h3 className="text-lg font-bold">Top Subjects</h3>
      </div>
      <div className="space-y-5">
        {performance.map((subject, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold text-sm">{subject.subject}</p>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {subject.hours}h · {subject.sessions} sessions
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: `${Math.min((subject.hours / 50) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
