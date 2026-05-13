import { getTodayKey, parseDate, formatDateKey, daysBetween } from './dateUtils'

/**
 * Calculate current streak (consecutive days ending today or yesterday)
 */
export const calculateCurrentStreak = (entries) => {
  if (entries.length === 0) return 0
  
  const entriesByDate = {}
  entries.forEach(entry => {
    if (!entriesByDate[entry.date]) {
      entriesByDate[entry.date] = 0
    }
    entriesByDate[entry.date] += entry.hours
  })
  
  let streak = 0
  let currentDate = new Date()
  
  while (true) {
    const dateKey = formatDateKey(currentDate)
    if (entriesByDate[dateKey] && entriesByDate[dateKey] > 0) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      break
    }
  }
  
  return streak
}

/**
 * Calculate longest streak ever recorded
 */
export const calculateLongestStreak = (entries) => {
  if (entries.length === 0) return 0
  
  const entriesByDate = {}
  entries.forEach(entry => {
    if (!entriesByDate[entry.date]) {
      entriesByDate[entry.date] = 0
    }
    entriesByDate[entry.date] += entry.hours
  })
  
  const dates = Object.keys(entriesByDate)
    .filter(date => entriesByDate[date] > 0)
    .sort()
  
  if (dates.length === 0) return 0
  
  let maxStreak = 1
  let currentStreak = 1
  
  for (let i = 1; i < dates.length; i++) {
    const prevDate = parseDate(dates[i - 1])
    const currentDate = parseDate(dates[i])
    const dayDiff = daysBetween(prevDate, currentDate)
    
    if (dayDiff === 1) {
      currentStreak++
      maxStreak = Math.max(maxStreak, currentStreak)
    } else {
      currentStreak = 1
    }
  }
  
  return maxStreak
}

/**
 * Calculate weekly streak (number of weeks with at least 1 study day)
 */
export const calculateWeeklyStreak = (entries) => {
  if (entries.length === 0) return 0
  
  const entriesByDate = {}
  entries.forEach(entry => {
    if (!entriesByDate[entry.date]) {
      entriesByDate[entry.date] = true
    }
  })
  
  let weeklyStreak = 0
  let currentDate = new Date()
  currentDate.setDate(currentDate.getDate() - currentDate.getDay()) // Start of current week
  
  while (true) {
    let weekHasEntry = false
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate)
      date.setDate(date.getDate() + i)
      const dateKey = formatDateKey(date)
      
      if (entriesByDate[dateKey]) {
        weekHasEntry = true
        break
      }
    }
    
    if (weekHasEntry) {
      weeklyStreak++
      currentDate.setDate(currentDate.getDate() - 7)
    } else {
      break
    }
  }
  
  return weeklyStreak
}

/**
 * Calculate productivity percentage (study days / total days since first entry)
 */
export const calculateProductivityPercent = (entries) => {
  if (entries.length === 0) return 0
  
  const dates = new Set(entries.map(e => e.date))
  if (dates.size === 0) return 0
  
  const sortedDates = Array.from(dates).sort()
  const firstDate = parseDate(sortedDates[0])
  const lastDate = parseDate(sortedDates[sortedDates.length - 1])
  
  const totalDays = daysBetween(firstDate, lastDate) + 1
  const studyDays = dates.size
  
  return Math.round((studyDays / totalDays) * 100)
}

/**
 * Get total study days
 */
export const getTotalStudyDays = (entries) => {
  const dates = new Set(entries.map(e => e.date))
  return dates.size
}

/**
 * Get total hours by subject (last 30 days or all)
 */
export const getTotalHoursBySubject = (entries, days = null) => {
  let filtered = entries
  
  if (days) {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    const cutoffKey = formatDateKey(cutoffDate)
    filtered = entries.filter(e => e.date >= cutoffKey)
  }
  
  const hours = {}
  filtered.forEach(entry => {
    if (!hours[entry.subject]) {
      hours[entry.subject] = 0
    }
    hours[entry.subject] += entry.hours
  })
  
  return hours
}

/**
 * Get hours studied on a specific date
 */
export const getHoursByDate = (entries, dateString) => {
  return entries
    .filter(e => e.date === dateString)
    .reduce((sum, e) => sum + e.hours, 0)
}

/**
 * Get all subjects studied on a specific date
 */
export const getSubjectsByDate = (entries, dateString) => {
  return entries
    .filter(e => e.date === dateString)
    .map(e => e.subject)
}

/**
 * Get unique subjects
 */
export const getUniqueSubjects = (entries) => {
  return [...new Set(entries.map(e => e.subject))]
}
