import { getTotalStudyDays, calculateCurrentStreak } from './streakUtils'
import { getUniqueSubjects } from './streakUtils'

/**
 * Achievement definitions
 */
export const ACHIEVEMENTS = {
  first_step: {
    id: 'first_step',
    name: 'First Step',
    description: 'Log your first study entry',
    icon: '👣',
    condition: (entries) => entries.length > 0,
  },
  week_warrior: {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Achieve a 7-day streak',
    icon: '⚔️',
    condition: (entries, currentStreak) => currentStreak >= 7,
  },
  month_master: {
    id: 'month_master',
    name: 'Month Master',
    description: 'Achieve a 30-day streak',
    icon: '👑',
    condition: (entries, currentStreak) => currentStreak >= 30,
  },
  century: {
    id: 'century',
    name: 'Century',
    description: 'Log 100 total study days',
    icon: '💯',
    condition: (entries) => getTotalStudyDays(entries) >= 100,
  },
  subject_juggler: {
    id: 'subject_juggler',
    name: 'Subject Juggler',
    description: 'Study 5 different subjects',
    icon: '🤹',
    condition: (entries) => getUniqueSubjects(entries).length >= 5,
  },
  night_owl: {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Study 50 hours total',
    icon: '🦉',
    condition: (entries) => entries.reduce((sum, e) => sum + e.hours, 0) >= 50,
  },
  early_bird: {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Study 100 hours total',
    icon: '🐦',
    condition: (entries) => entries.reduce((sum, e) => sum + e.hours, 0) >= 100,
  },
}

/**
 * Get unlocked achievements
 */
export const getUnlockedAchievements = (entries, currentStreak) => {
  return Object.values(ACHIEVEMENTS).filter(achievement => {
    return achievement.condition(entries, currentStreak)
  })
}

/**
 * Check if achievement is unlocked
 */
export const isAchievementUnlocked = (achievementId, entries, currentStreak) => {
  const achievement = ACHIEVEMENTS[achievementId]
  if (!achievement) return false
  return achievement.condition(entries, currentStreak)
}

/**
 * Get motivational message based on streak
 */
export const getMotivationalMessage = (streak) => {
  if (streak === 0) {
    return { message: "Start your streak today!", badge: "Beginner" }
  } else if (streak >= 1 && streak <= 6) {
    return { message: "Great start! Keep going strong", badge: "Building" }
  } else if (streak >= 7 && streak <= 13) {
    return { message: "One week strong! You're on fire!", badge: "Hot" }
  } else if (streak >= 14 && streak <= 29) {
    return { message: "Two weeks and counting!", badge: "OnFire" }
  } else {
    return { message: "Legend status!", badge: "Legend" }
  }
}
