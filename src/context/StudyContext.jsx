import React, { createContext, useCallback, useMemo, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { generateSampleData } from '../data/sampleData'
import { formatDateKey, getTodayKey } from '../utils/dateUtils'
import { 
  calculateCurrentStreak, 
  calculateLongestStreak, 
  calculateWeeklyStreak,
  calculateProductivityPercent,
  getTotalStudyDays,
  getTotalHoursBySubject,
  getUniqueSubjects
} from '../utils/streakUtils'

export const StudyContext = createContext()

export const StudyProvider = ({ children }) => {
  const [entries, setEntries] = useLocalStorage('study_entries', () => {
    return generateSampleData()
  })

  const [settings, setSettings] = useLocalStorage('app_settings', {
    theme: 'light',
    weeklyGoalHours: 15,
    name: 'Student',
    pomodoroWork: 25,
    pomodoroBreak: 5,
  })

  const addEntry = useCallback((entry) => {
    const newEntry = {
      ...entry,
      id: entry.id || generateId(),
      createdAt: entry.createdAt || new Date().toISOString(),
    }
    setEntries(prev => [...prev, newEntry])
    return newEntry
  }, [setEntries])

  const updateEntry = useCallback((id, updates) => {
    setEntries(prev =>
      prev.map(entry =>
        entry.id === id ? { ...entry, ...updates } : entry
      )
    )
  }, [setEntries])

  const deleteEntry = useCallback((id) => {
    setEntries(prev => prev.filter(entry => entry.id !== id))
  }, [setEntries])

  const getEntriesByDate = useCallback((dateString) => {
    return entries.filter(entry => entry.date === dateString)
  }, [entries])

  const getEntriesByMonth = useCallback((monthDate) => {
    const date = new Date(monthDate)
    const year = date.getFullYear()
    const month = date.getMonth()
    return entries.filter(entry => {
      const entryDate = new Date(entry.date)
      return entryDate.getFullYear() === year && entryDate.getMonth() === month
    })
  }, [entries])

  const getTodayEntries = useCallback(() => {
    return getEntriesByDate(getTodayKey())
  }, [getEntriesByDate])

  const clearAllData = useCallback(() => {
    setEntries([])
  }, [setEntries])

  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }, [setSettings])

  // Compute streak and analytics data
  const computedData = useMemo(() => {
    // Build hoursByDate object
    const hoursByDate = {}
    entries.forEach(entry => {
      if (!hoursByDate[entry.date]) {
        hoursByDate[entry.date] = 0
      }
      hoursByDate[entry.date] += entry.hours
    })

    // Build subjectsByDate object
    const subjectsByDate = {}
    entries.forEach(entry => {
      if (!subjectsByDate[entry.date]) {
        subjectsByDate[entry.date] = []
      }
      if (!subjectsByDate[entry.date].includes(entry.subject)) {
        subjectsByDate[entry.date].push(entry.subject)
      }
    })

    // Calculate total hours
    const totalHours = Object.values(hoursByDate).reduce((sum, hours) => sum + hours, 0)

    return {
      currentStreak: calculateCurrentStreak(entries),
      longestStreak: calculateLongestStreak(entries),
      weeklyStreak: calculateWeeklyStreak(entries),
      totalStudyDays: getTotalStudyDays(entries),
      totalHours,
      hoursByDate,
      subjectsByDate,
      uniqueSubjects: getUniqueSubjects(entries),
      productivityPercent: calculateProductivityPercent(entries),
    }
  }, [entries])

  const value = {
    entries,
    settings,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntriesByDate,
    getEntriesByMonth,
    getTodayEntries,
    clearAllData,
    updateSettings,
    ...computedData,
  }

  return (
    <StudyContext.Provider value={value}>
      {children}
    </StudyContext.Provider>
  )
}

/**
 * Generate a UUID-like string without external library
 */
const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
