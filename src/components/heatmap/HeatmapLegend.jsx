import React from 'react'

export const HeatmapLegend = () => {
  const colors = [
    { color: '#f8f9fa', label: '0h' },
    { color: '#c6f6d5', label: '<1h' },
    { color: '#84e6b8', label: '1-2h' },
    { color: '#188038', label: '2-4h' },
    { color: '#105221', label: '4+h' },
  ]

  return (
    <div className="flex items-center gap-3 mt-8 text-xs font-medium">
      <span className="text-[var(--text-secondary)]">Less</span>
      <div className="flex gap-2">
        {colors.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1">
            <div
              className="w-4 h-4 rounded-sm"
              style={{
                backgroundColor: item.color,
                border: '1px solid var(--border)',
              }}
            />
            <span className="text-caption text-[var(--text-secondary)]">{item.label}</span>
          </div>
        ))}
      </div>
      <span className="text-[var(--text-secondary)]">More</span>
    </div>
  )
}
