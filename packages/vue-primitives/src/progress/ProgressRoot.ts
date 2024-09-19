import { createContext } from '../hooks/index.ts'
import { isNumber } from '../shared/index.ts'

export interface ProgressRootProps {
  value?: number | null | undefined
  max?: number
  getValueLabel?: (value: number, max: number) => string
}

type ProgressState = 'indeterminate' | 'complete' | 'loading'

export interface ProgressContext {
  value: () => number | null
  max: () => number
}

export const [provideProgressContext, useProgressContext] = createContext<ProgressContext>('Progress')

export const DEFAULT_MAX = 100

export function defaultGetValueLabel(value: number, max: number) {
  return `${Math.round((value / max) * 100)}%`
}

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
