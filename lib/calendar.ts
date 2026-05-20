export function generateGoogleCalendarLink(event: {
  title: string
  description: string
  location: string
  startDate: Date
  endDate: Date
}) {
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location,
    dates: `${fmt(event.startDate)}/${fmt(event.endDate)}`,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}
