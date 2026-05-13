import React from 'react'

export const Card = ({ children, className = '', accent = false }) => {
  return (
    <div className={`card ${accent ? 'card-accent' : ''} ${className}`}>
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = '' }) => {
  return <div className={`mb-6 ${className}`}>{children}</div>
}

export const CardTitle = ({ children, className = '' }) => {
  return (
    <h3 className={`h3 text-[var(--text-primary)] ${className}`}>
      {children}
    </h3>
  )
}

export const CardContent = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>
}
