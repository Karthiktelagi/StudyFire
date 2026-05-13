/**
 * Export entries to CSV and trigger download
 */
export const exportToCSV = (entries) => {
  const headers = ['Date', 'Hours', 'Subject', 'Notes', 'Completed']
  const rows = entries
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(entry => [
      entry.date,
      entry.hours,
      entry.subject,
      entry.notes ? `"${entry.notes.replace(/"/g, '""')}"` : '',
      entry.completed ? 'Yes' : 'No'
    ])
  
  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  
  link.setAttribute('href', url)
  link.setAttribute('download', `study-data-${dateStr}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
