import type { IfAny } from '@vue/shared'
import type { Ref } from 'vue'

export interface MutableRefObject<T> {
  value: T
}

export interface RefObject<T> {
  readonly value: T
}

export function useRef<T>(value: T): Ref extends T
  ? T extends Ref
    ? IfAny<T, MutableRefObject<T>, T>
    : MutableRefObject<T>
  : MutableRefObject<T>
export function useRef<T = any>(): MutableRefObject<T | undefined>
export function useRef(initialValue?: unknown) {
  return { value: initialValue }
}
