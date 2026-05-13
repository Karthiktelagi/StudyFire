import { formatDateKey } from '../utils/dateUtils'
import { v4 as uuidv4 } from 'uuid'

const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'History', 'Literature', 'CS', 'Biology', 'Economics']

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

/**
 * Generate realistic sample data for the past 365 days
 */
export const generateSampleData = () => {
  const entries = []
  const today = new Date()
  
  // Create entries for the past 365 days
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateKey = formatDateKey(date)
    
    // ~70% chance of having an entry
    if (Math.random() < 0.7) {
      // Sometimes add multiple entries (different subjects)
      const entryCount = Math.random() < 0.15 ? 2 : 1
      
      for (let j = 0; j < entryCount; j++) {
        // Weighted random hours: more likely to be 1-4 hrs
        const rand = Math.random()
        let hours = 0.5
        
        if (rand < 0.2) hours = 0.5
        else if (rand < 0.4) hours = 1
        else if (rand < 0.6) hours = 1.5
        else if (rand < 0.75) hours = 2
        else if (rand < 0.85) hours = 3
        else if (rand < 0.93) hours = 4
        else hours = Math.random() * 8 + 2
        
        const subject = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)]
        
        const entry = {
          id: generateId(),
          date: dateKey,
          hours: parseFloat(hours.toFixed(1)),
          subject,
          notes: Math.random() < 0.3 ? `Studied ${subject} chapter ${Math.floor(Math.random() * 10) + 1}` : '',
          completed: Math.random() < 0.9,
          createdAt: new Date(date).toISOString(),
        }
        
        entries.push(entry)
      }
    }
  }
  
  return entries
}
