import React, { useContext, useMemo } from 'react'
import { StudyContext } from '../../context/StudyContext'
import { Share2, Heart } from 'lucide-react'

export default function StreakShare() {
  const { currentStreak, longestStreak, totalStudyDays, productivityPercent } = useContext(StudyContext)

  const shareMessage = useMemo(() => {
    const messages = [
      `I'm on a ${currentStreak}-day study streak on StudyFire! Join me and build consistent study habits.`,
      `StudyFire helped me achieve ${longestStreak} consecutive study days! 🏆 Track your consistency today.`,
      `${totalStudyDays} study days, ${productivityPercent}% productivity. StudyFire is my study companion! 📚`,
      `Consistency is key! I've studied ${totalStudyDays} days with StudyFire. Let's study together! 💪`
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }, [currentStreak, longestStreak, totalStudyDays, productivityPercent])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareMessage)
  }

  return (
    <div className="card bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/30 border border-pink-200 dark:border-pink-700 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Share2 className="text-pink-500 w-5 h-5" />
        <h3 className="text-lg font-bold">Share Your Progress</h3>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-3 border border-pink-200 dark:border-pink-700">
        <p className="text-sm text-gray-800 dark:text-gray-200 italic">{shareMessage}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={copyToClipboard}
          className="flex-1 px-4 py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition text-sm"
        >
          📋 Copy Message
        </button>
        <button
          className="px-4 py-2 rounded-lg border border-pink-300 dark:border-pink-600 text-pink-600 dark:text-pink-400 font-semibold hover:bg-pink-50 dark:hover:bg-pink-900/30 transition text-sm"
        >
          <Heart className="w-4 h-4 inline mr-1" />
          Like
        </button>
      </div>
    </div>
  )
}
