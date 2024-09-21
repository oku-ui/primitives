import type { AriaAttributes, Events, HTMLAttributes } from 'vue'
import type { IAttrsData } from './mergeProps.ts'

export type ConvertEmitsToUseEmits<T extends Record<string, any[]>> = {
  [K in keyof T as K extends `update:${infer Rest}`
    ? `onUpdate${Capitalize<Rest>}`
    : `on${Capitalize<string & K>}`]?: (event: T[K][0]) => void
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

export type ElAttrs = Partial<AllEventHandlers & AriaAttributes & HTMLAttributes> & Partial<Record<string, unknown>>

export type RadixPrimitiveReturns<T extends ElAttrs = ElAttrs> = (extraAttrs?: IAttrsData[]) => T
