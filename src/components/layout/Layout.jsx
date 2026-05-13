import React from 'react'
import NewNavbar from './NewNavbar'

export const Layout = ({ children, currentPage, onPageChange, pageTitle, onLogout }) => {
  return (
    <div className="min-h-screen bg-[var(--surface)] dark:bg-[#1a1a1a]">
      <NewNavbar onPageChange={onPageChange} currentPage={currentPage} onLogout={onLogout} />
      
      <main className="w-full">
        {children}
      </main>
    </div>
  )
}
