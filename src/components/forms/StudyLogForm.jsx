import React, { useState, useContext, useEffect } from 'react'
import { Modal } from '../ui/Modal'
import { StudyContext } from '../../context/StudyContext'
import { getTodayKey, formatDateKey } from '../../utils/dateUtils'
import { getUniqueSubjects } from '../../utils/streakUtils'

export const StudyLogForm = ({ isOpen, onClose, editEntry = null }) => {
  const { addEntry, updateEntry, entries } = useContext(StudyContext)
  const [date, setDate] = useState(getTodayKey())
  const [hours, setHours] = useState('1')
  const [subject, setSubject] = useState('')
  const [notes, setNotes] = useState('')
  const [completed, setCompleted] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editEntry) {
      setDate(editEntry.date)
      setHours(editEntry.hours.toString())
      setSubject(editEntry.subject)
      setNotes(editEntry.notes)
      setCompleted(editEntry.completed)
    } else {
      setDate(getTodayKey())
      setHours('1')
      setSubject('')
      setNotes('')
      setCompleted(true)
    }
    setError('')
  }, [editEntry, isOpen])

  const uniqueSubjects = getUniqueSubjects(entries)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!hours || parseFloat(hours) <= 0) {
      setError('Hours must be greater than 0')
      return
    }
    
    if (!subject.trim()) {
      setError('Subject is required')
      return
    }

    const entryData = {
      date,
      hours: parseFloat(hours),
      subject: subject.trim(),
      notes: notes.trim(),
      completed,
    }

    if (editEntry) {
      updateEntry(editEntry.id, entryData)
    } else {
      addEntry(entryData)
    }

    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editEntry ? 'Edit Entry' : 'Log Study Session'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="label">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
            required
          />
        </div>

        <div>
          <label className="label">Hours Studied</label>
          <input
            type="number"
            step="0.5"
            min="0.5"
            max="12"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="input"
            required
          />
        </div>

        <div>
          <label className="label">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Mathematics"
            list="subjects-list"
            className="input"
            required
          />
          <datalist id="subjects-list">
            {uniqueSubjects.map(subj => (
              <option key={subj} value={subj} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="label">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes about your study session..."
            className="input resize-none"
            rows="3"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="w-4 h-4 accent-green-600"
          />
          <label htmlFor="completed" className="text-sm text-gray-700 dark:text-gray-300">
            Marked as completed
          </label>
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            className="btn-primary flex-1"
          >
            {editEntry ? 'Update Entry' : 'Log Study'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}
