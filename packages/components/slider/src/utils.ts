export function getDecimalCount(value: number) {
  return (String(value).split('.')[1] || '').length
}

export function roundValue(value: number, decimalCount: number) {
  const rounder = 10 ** decimalCount
  return Math.round(value * rounder) / rounder
}

export function clamp(value: number, [min, max]: [number, number]): number {
  return Math.min(max, Math.max(min, value))
}

export function nearestValue(value: number, min: number, max: number, step: number) {
  const steps = Math.round((value - min) / step)
  return steps * step + min
}
