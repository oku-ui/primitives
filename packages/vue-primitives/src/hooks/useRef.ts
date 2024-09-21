import type { IfAny } from '@vue/shared'
import type { Ref } from 'vue'

export interface MutableRefObject<T> {
  current: T
}

export interface RefObject<T> {
  readonly current: T
}

export function useRef<T>(value: T): Ref extends T
  ? T extends Ref
    ? IfAny<T, MutableRefObject<T>, T>
    : MutableRefObject<T>
  : MutableRefObject<T>
export function useRef<T = any>(): MutableRefObject<T | undefined>
export function useRef(initialValue?: unknown) {
  return { current: initialValue }
}
