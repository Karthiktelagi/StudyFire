import React, { useState, useContext } from 'react'
import { Card, CardContent, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { StudyContext } from '../context/StudyContext'
import { getMonthCalendarGrid, formatDateKey, getTodayKey } from '../utils/dateUtils'
import { getHoursByDate, getSubjectsByDate } from '../utils/streakUtils'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { format, parse } from 'date-fns'

export const CalendarView = () => {
  const { entries, getEntriesByDate } = useContext(StudyContext)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  const grid = getMonthCalendarGrid(currentMonth)
  const today = getTodayKey()
  const selectedEntries = selectedDate ? getEntriesByDate(selectedDate) : []

  const getColorClass = (hours) => {
    if (hours === 0) return 'bg-gray-100 dark:bg-gray-800'
    if (hours < 1) return 'bg-green-200 dark:bg-green-900'
    if (hours < 2) return 'bg-green-300 dark:bg-green-700'
    if (hours < 4) return 'bg-green-500 dark:bg-green-500'
    return 'bg-green-700 dark:bg-green-300'
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
    setSelectedDate(null)
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
    setSelectedDate(null)
  }

  const monthYear = format(currentMonth, 'MMMM yyyy')
  const daysInGrid = Math.ceil(grid.length / 7)

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto space-y-6 page-enter">
      <Card>
        <CardContent className="pt-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {monthYear}
            </h2>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {/* Weekday headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div
                key={day}
                className="text-center font-semibold text-gray-700 dark:text-gray-300 text-sm py-2"
              >
                {day}
              </div>
            ))}

            {/* Days */}
            {grid.map((dayObj, idx) => {
              const hours = getHoursByDate(entries, dayObj.date)
              const isToday = dayObj.date === today
              const isSelected = dayObj.date === selectedDate

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(dayObj.date)}
                  className={`aspect-square rounded-lg font-semibold transition-all duration-200 hover:scale-105 relative ${
                    !dayObj.currentMonth
                      ? 'opacity-50'
                      : getColorClass(hours)
                  } ${
                    isToday ? 'ring-2 ring-blue-500' : ''
                  } ${
                    isSelected ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-sm">{parseInt(dayObj.date.split('-')[2])}</span>
                    {hours > 0 && (
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        •
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected Date Panel */}
          {selectedDate && (
            <div className="mt-6 p-4 rounded-lg border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {format(parse(selectedDate, 'yyyy-MM-dd', new Date()), 'EEEE, MMMM d, yyyy')}
                </h3>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="p-1 hover:bg-purple-200 dark:hover:bg-purple-800 rounded transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {selectedEntries.length > 0 ? (
                <div className="space-y-3">
                  {selectedEntries.map(entry => (
                    <div
                      key={entry.id}
                      className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {entry.subject}
                        </h4>
                        <Badge variant="success" size="sm">
                          {entry.hours}h
                        </Badge>
                      </div>
                      {entry.notes && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {entry.notes}
                        </p>
                      )}
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {entry.completed ? '✓ Completed' : 'In progress'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  No study logged this day
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
