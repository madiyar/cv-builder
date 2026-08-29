import dayjs from 'dayjs'

export function formatDate(date?: string): string {
  if (!date) return ''
  return dayjs(date).format('MMM YYYY')
}

export function formatRange(startDate?: string, endDate?: string): string {
  const start = formatDate(startDate)
  const end = endDate ? formatDate(endDate) : 'Present'
  return [start, end].filter(Boolean).join(' – ')
}
