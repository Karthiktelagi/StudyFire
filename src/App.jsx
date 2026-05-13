import React, { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { StudyProvider } from './context/StudyContext'
import { Layout } from './components/layout/Layout'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './pages/Dashboard'
import { Analytics } from './pages/Analytics'
import { CalendarView } from './pages/CalendarView'
import { Settings } from './pages/Settings'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  // Check if user is already logged in on app load
  useEffect(() => {
    const auth = localStorage.getItem('studyFireAuth')
    if (auth) {
      try {
        const { isLoggedIn: loggedIn } = JSON.parse(auth)
        setIsLoggedIn(loggedIn)
      } catch (e) {
        setIsLoggedIn(false)
      }
    }
    setLoading(false)
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('studyFireAuth')
    localStorage.removeItem('studyFireUser')
    setIsLoggedIn(false)
  }

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      analytics: 'Analytics',
      calendar: 'Calendar',
      settings: 'Settings',
    }
    return titles[currentPage] || 'Dashboard'
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'analytics':
        return <Analytics />
      case 'calendar':
        return <CalendarView />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  if (loading) {
    return (
      <ThemeProvider>
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#1a1a1a]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)] mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)]">Loading...</p>
          </div>
        </div>
      </ThemeProvider>
    )
  }

  if (!isLoggedIn) {
    return (
      <ThemeProvider>
        <LandingPage onLogin={handleLogin} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <StudyProvider>
        <Layout
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          pageTitle={getPageTitle()}
          onLogout={handleLogout}
        >
          {renderPage()}
        </Layout>
      </StudyProvider>
    </ThemeProvider>
  )
}

export default App
