import { format, parse, startOfYear, endOfDay, differenceInDays, isAfter, isBefore } from 'date-fns'

/**
 * Format date to YYYY-MM-DD string
 */
export const formatDateKey = (date) => {
  return format(new Date(date), 'yyyy-MM-dd')
}

/**
 * Parse YYYY-MM-DD string to Date object
 */
export const parseDate = (dateString) => {
  return parse(dateString, 'yyyy-MM-dd', new Date())
}

/**
 * Get today's date as YYYY-MM-DD
 */
export const getTodayKey = () => {
  return formatDateKey(new Date())
}

/**
 * Get start of this year
 */
export const getYearStart = () => {
  return startOfYear(new Date())
}

/**
 * Get array of weeks from start date to end date
 * Each week is an array of 7 days (dates)
 */
export const getWeeksArray = (startDate, endDate) => {
  const weeks = []
  let currentDate = new Date(startDate)
  
  // Adjust to start from Sunday
  const dayOfWeek = currentDate.getDay()
  currentDate.setDate(currentDate.getDate() - dayOfWeek)
  
  while (isBefore(currentDate, endDate) || currentDate.toDateString() === endDate.toDateString()) {
    const week = []
    for (let i = 0; i < 7; i++) {
      week.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    weeks.push(week)
  }
  
  return weeks
}

/**
 * Get month abbreviation for a date
 */
export const getMonthAbbr = (date) => {
  return format(new Date(date), 'MMM')
}

/**
 * Get weekday letter (M, T, W, etc.)
 */
export const getWeekdayLetter = (dayIndex) => {
  const letters = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  return letters[dayIndex]
}

/**
 * Get day of week number (0-6, Sunday-Saturday)
 */
export const getDayOfWeek = (date) => {
  return new Date(date).getDay()
}

/**
 * Check if date is today
 */
export const isToday = (dateString) => {
  return dateString === getTodayKey()
}

/**
 * Get number of days between two dates
 */
export const daysBetween = (date1, date2) => {
  return differenceInDays(new Date(date2), new Date(date1))
}

/**
 * Get last 30 days as array of date strings
 */
export const getLast30Days = () => {
  const days = []
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    days.push(formatDateKey(date))
  }
  return days
}

/**
 * Get last 7 days with weekday names
 */
export const getLastWeekDays = () => {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    days.push({
      date: formatDateKey(date),
      day: format(date, 'EEE'),
      shortDay: format(date, 'E'),
    })
  }
  return days
}

/**
 * Get first and last day of a month
 */
export const getMonthRange = (monthDate) => {
  const date = new Date(monthDate)
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return { firstDay, lastDay }
}

/**
 * Get calendar grid for a month (with padding for previous/next month)
 */
export const getMonthCalendarGrid = (monthDate) => {
  const date = new Date(monthDate)
  const year = date.getFullYear()
  const month = date.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDay.getDay()
  
  const grid = []
  
  // Add days from previous month
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(firstDay)
    date.setDate(date.getDate() - (i + 1))
    grid.push({ date: formatDateKey(date), currentMonth: false })
  }
  
  // Add days of current month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    grid.push({ date: formatDateKey(new Date(year, month, day)), currentMonth: true })
  }
  
  // Add days from next month
  const remainingDays = 42 - grid.length
  for (let i = 1; i <= remainingDays; i++) {
    grid.push({ date: formatDateKey(new Date(year, month + 1, i)), currentMonth: false })
  }
  
  return grid
}
