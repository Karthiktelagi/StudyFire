import { useState, useEffect, useCallback } from 'react'

/**
 * Pomodoro timer hook
 */
export const usePomodoro = (workMinutes = 25, breakMinutes = 5) => {
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkPhase, setIsWorkPhase] = useState(true)
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)

  useEffect(() => {
    let interval
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      // Phase completed
      playNotification()
      
      if (isWorkPhase) {
        // Switch to break
        setIsWorkPhase(false)
        setTimeLeft(breakMinutes * 60)
      } else {
        // Switch to work
        setIsWorkPhase(true)
        setTimeLeft(workMinutes * 60)
        setSessionsCompleted(prev => prev + 1)
      }
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, isWorkPhase, workMinutes, breakMinutes])

  const playNotification = () => {
    if (typeof Audio !== 'undefined') {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 800
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }
  }

  const start = useCallback(() => setIsRunning(true), [])
  const pause = useCallback(() => setIsRunning(false), [])
  const reset = useCallback(() => {
    setIsRunning(false)
    setIsWorkPhase(true)
    setTimeLeft(workMinutes * 60)
  }, [workMinutes])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = isWorkPhase 
    ? 1 - (timeLeft / (workMinutes * 60))
    : 1 - (timeLeft / (breakMinutes * 60))

  return {
    isRunning,
    isWorkPhase,
    timeLeft,
    minutes,
    seconds,
    progress,
    sessionsCompleted,
    start,
    pause,
    reset,
  }
}
