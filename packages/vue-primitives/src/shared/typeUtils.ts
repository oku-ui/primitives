import type { AriaAttributes, ComponentPublicInstance, Events, HTMLAttributes, Ref } from 'vue'
import type { MutableRefObject } from '../hooks/index.ts'

export type { LooseRequired } from '@vue/shared'

export type BooleanKey<T, K extends keyof T = keyof T> = K extends any ? [T[K]] extends [boolean | undefined] ? K : never : never

type PrimitiveProps<T> = (T extends { as?: any } ? Required<Pick<T, 'as'>> : unknown)

export type PrimitiveDefaultProps<T extends object, BK extends BooleanKey<T> = never, UK extends BooleanKey<T> = Exclude<BooleanKey<T>, BK>, K extends keyof T = Exclude<keyof T, BK>> =
  Record<UK, undefined> & Record<BK, boolean> & PrimitiveProps<T> & Partial<Record<K, unknown>>

export type EmitsToHookProps<T extends Record<string, any[]>> = {
  [K in keyof T as K extends `update:${infer Rest}`
    ? `onUpdate${Capitalize<Rest>}`
    : `on${Capitalize<string & K>}`]?: (...args: T[K]) => void
}

type BaseEventSuffixes = 'Capture' | 'Once' | 'Passive'

type CombineSuffixes<T extends string, U extends string = T> =
  T extends any
    ? T | `${T}${CombineSuffixes<Exclude<U, T>>}`
    : never

type EventSuffixes = CombineSuffixes<BaseEventSuffixes>

type EventHandlers<E> = (event: E) => void | Array<(event: E) => void>

type AllEventHandlers = {
  [K in keyof Events as K | `${K}${EventSuffixes}`]: EventHandlers<Events[K]>;
}

type Hook<T = () => void> = T | T[]

export type PrimitiveElAttrs<E extends HTMLElement = HTMLElement> = Partial<AllEventHandlers & AriaAttributes & HTMLAttributes> & Partial<Record<string, unknown>> & {
  elRef?: Hook<(nodeRef: E | undefined) => void>
}

export type RadixPrimitiveGetAttrs<E extends HTMLElement = HTMLElement> = (extraAttrs?: PrimitiveElAttrs<E>[]) => PrimitiveElAttrs<E>

export type RadixPrimitiveReturns<T = { attrs: RadixPrimitiveGetAttrs }> = T

export type VNodeRef = Element | ComponentPublicInstance | null | undefined

export type RefOrRefObject<T> = Ref<T> | MutableRefObject<T>
