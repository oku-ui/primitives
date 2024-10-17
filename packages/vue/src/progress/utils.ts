import type { Ref } from 'vue'
import { createScope, ScopePropObject } from '@oku-ui/provide'

export const DEFAULT_MAX = 100
const PROGRESS_NAME = 'OkuProgress'

export const scopeProgressProps = {
  scopeOkuProgress: {
    ...ScopePropObject,
  },
}

export function defaultGetValueLabel(value: number, max: number) {
  return `${Math.round((value / max) * 100)}%`
}

export function isNumber(value: any): value is number {
  return typeof value === 'number'
}

export function isValidMaxNumber(max: any): max is number {
  return isNumber(max) && !Number.isNaN(max) && max > 0
}

export function isValidValueNumber(value: any, max: number): value is number {
  return isNumber(value) && !Number.isNaN(value) && value <= max && value >= 0
}

export function getInvalidMaxError(propValue: string) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${PROGRESS_NAME}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`
}

export function getInvalidValueError(propValue: string) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${PROGRESS_NAME}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` if the progress is indeterminate.

Defaulting to \`null\`.`
}

export function getProgressState(
  maxValue: number,
  value?: number | null,
): 'indeterminate' | 'complete' | 'loading' {
  return value == null
    ? 'indeterminate'
    : value === maxValue
      ? 'complete'
      : 'loading'
}

interface ProgressContext {
  value: Ref<number | null | undefined>
  max: Ref<number>
}

export const [createProgressProvider, createProgressScope]
  = createScope<'OkuProgress'>(PROGRESS_NAME)

export const [useProgressProvide, useProgressInject]
  = createProgressProvider<ProgressContext>(PROGRESS_NAME)
