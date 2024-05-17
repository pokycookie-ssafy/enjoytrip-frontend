export function formatBytes(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']

  let unitIndex = 0
  while (bytes >= 1000 && unitIndex < units.length - 1) {
    bytes /= 1000
    unitIndex++
  }
  return `${Math.round(bytes)}${units[unitIndex]}`
}
