import type { Scope } from '@oku-ui/provide'
import { ScopePropObject } from '@oku-ui/provide'
import { DEFAULT_MAX, PROGRESS_NAME } from './constants'

export type ScopeProgress<T> = T & { scopeOkuProgress?: Scope }

export const scopeProgressProps = {
  scopeOkuProgress: {
    ...ScopePropObject,
  },
}

function defaultGetValueLabel(value: number, max: number) {
  return `${Math.round((value / max) * 100)}%`
}

function isNumber(value: any): value is number {
  return typeof value === 'number'
}

function isValidMaxNumber(max: any): max is number {
  return isNumber(max) && !Number.isNaN(max) && max > 0
}

function isValidValueNumber(value: any, max: number): value is number {
  return isNumber(value) && !Number.isNaN(value) && value <= max && value >= 0
}

function getInvalidMaxError(propValue: string) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${PROGRESS_NAME}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`
}

function getInvalidValueError(propValue: string) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${PROGRESS_NAME}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` if the progress is indeterminate.

Defaulting to \`null\`.`
}

function getProgressState(
  maxValue: number,
  value?: number | null,
): 'indeterminate' | 'complete' | 'loading' {
  return value == null
    ? 'indeterminate'
    : value === maxValue
      ? 'complete'
      : 'loading'
}

export {
  getProgressState,
  getInvalidValueError,
  getInvalidMaxError,
  isValidMaxNumber,
  isValidValueNumber,
  defaultGetValueLabel,
  isNumber,
}
