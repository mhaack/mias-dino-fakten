export function formatDateToYYYYMMDD(date: Date): string {
  return date.toISOString().substring(0, 10)
}

export function formatDateToMMMYYYY(date: Date): string {
  return date.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
}
