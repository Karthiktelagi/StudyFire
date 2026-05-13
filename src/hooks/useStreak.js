import { useMemo } from 'react'
import {
  calculateCurrentStreak,
  calculateLongestStreak,
  calculateWeeklyStreak,
  calculateProductivityPercent,
  getTotalStudyDays,
  getTotalHoursBySubject,
} from '../utils/streakUtils'

/**
 * Hook to compute streak and study statistics
 */
export const useStreak = (entries) => {
  return useMemo(() => {
    const currentStreak = calculateCurrentStreak(entries)
    const longestStreak = calculateLongestStreak(entries)
    const weeklyStreak = calculateWeeklyStreak(entries)
    const productivityPercent = calculateProductivityPercent(entries)
    const totalStudyDays = getTotalStudyDays(entries)
    const totalHoursBySubject = getTotalHoursBySubject(entries)

    return {
      currentStreak,
      longestStreak,
      weeklyStreak,
      productivityPercent,
      totalStudyDays,
      totalHoursBySubject,
    }
  }, [entries])
}
