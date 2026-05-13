import React, { useState } from 'react'
import { BookOpen, BarChart3, Calendar, Settings, Menu, X } from 'lucide-react'
import { ThemeToggle } from '../ui/ThemeToggle'
import { Logo } from '../ui/Logo'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export const Sidebar = ({ currentPage, onPageChange, isMobile = false, isOpen = false, onClose = () => {} }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative w-60 h-screen bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-transform duration-300 z-40 ${
          isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : ''
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 flex items-center justify-between bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/20 border-b border-blue-200 dark:border-blue-800">
            <Logo size="sm" withText={false} />
            <div>
              <div className="text-sm font-bold text-blue-900 dark:text-blue-100">StudyFire</div>
              <div className="text-xs text-blue-700 dark:text-blue-300 font-medium">Learn Consistently</div>
            </div>
            {isMobile && (
              <button onClick={onClose} className="md:hidden">
                <X size={20} className="text-gray-500" />
              </button>
            )}
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id)
                    if (isMobile) onClose()
                  }}
                  className={`nav-link w-full justify-start ${
                    currentPage === item.id ? 'active' : ''
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  )
}
