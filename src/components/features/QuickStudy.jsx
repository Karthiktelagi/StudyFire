import React, { useState, useContext } from 'react'
import { StudyContext } from '../../context/StudyContext'
import { BookOpen } from 'lucide-react'

export default function QuickStudy() {
  const { addEntry } = useContext(StudyContext)
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'History', 'Literature', 'Economics']
  const [justAdded, setJustAdded] = useState(null)

  const quickStart = (subject, duration) => {
    const entry = {
      date: new Date().toISOString().split('T')[0],
      hours: duration,
      subject,
      notes: `Quick study session - ${duration}hr`,
      completed: true
    }
    addEntry(entry)
    setJustAdded(subject)
    setTimeout(() => setJustAdded(null), 2000)
  }

  const abbreviate = (subject) => {
    return subject.split(' ').map(w => w[0]).join('').toUpperCase()
  }

  return (
    <div className="card p-6" style={{ backgroundColor: '#1e3a2f' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center">
          <BookOpen className="text-white w-6 h-6" />
        </div>
        <div>
          <h3 className="h3 text-white">Quick Study</h3>
          <p className="caption text-white/70 mt-1">Start a 30-minute session instantly</p>
        </div>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {subjects.map(subject => (
          <button
            key={subject}
            onClick={() => quickStart(subject, 0.5)}
            className="relative group px-3 py-2 rounded-full font-medium text-white text-xs transition-all"
            style={{
              backgroundColor: justAdded === subject ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              transitionDuration: 'var(--transition-normal)',
            }}
            title={`Start 30min ${subject} session`}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'
            }}
            onMouseLeave={(e) => {
              if (justAdded !== subject) {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'
              }
            }}
          >
            {abbreviate(subject)}
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-[#1a1a1a] text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {subject}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
