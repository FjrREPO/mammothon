export const formatNumber = (value: number | null, options: {
  decimals?: number
  prefix?: string
  suffix?: string
  compact?: boolean
} = {}) => {
  if (value === null) return '...'
  const { decimals = 2, prefix = '', suffix = '', compact = false } = options

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    notation: compact ? 'compact' : 'standard',
  })

  return `${prefix}${formatter.format(value)}${suffix}`
}