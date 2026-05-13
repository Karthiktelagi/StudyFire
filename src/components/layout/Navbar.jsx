import React, { useState } from 'react'
import { Menu } from 'lucide-react'

export const Navbar = ({ onMenuClick, title }) => {
  return (
    <nav className="md:hidden sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-4 flex items-center justify-between">
      <button
        onClick={onMenuClick}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <Menu size={20} className="text-gray-600 dark:text-gray-400" />
      </button>
      <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>
      <div className="w-10" /> {/* Spacer for centering */}
    </nav>
  )
}
