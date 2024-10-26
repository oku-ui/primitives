import { isNumber } from '../shared/index.ts'

export const DEFAULT_MAX = 100

export function defaultGetValueLabel(value: number, max: number) {
  return `${Math.round((value / max) * 100)}%`
}

type ProgressState = 'indeterminate' | 'complete' | 'loading'

export function getProgressState(value: number | undefined | null, maxValue: number): ProgressState {
  return value == null ? 'indeterminate' : value === maxValue ? 'complete' : 'loading'
}

export function isValidMaxNumber(max: unknown): max is number {
  return (
    isNumber(max)
    && !Number.isNaN(max)
    && max > 0
  )
}

export function isValidValueNumber(value: unknown, max: number): value is number {
  return (
    isNumber(value)
    && !Number.isNaN(value)
    && value <= max
    && value >= 0
  )
}
