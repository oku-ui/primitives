import type { Prettify } from '@vue/shared'
import type { EmitsToHookProps } from './typeUtils'

type ReplaceProps<T, K extends keyof T> = Omit<T, K> & { [P in K]: () => T[P] }

export function convertCompPropToHook<
  T extends object,
  K extends keyof T,
  E extends Record<string, any[]>,
  EP extends Required<EmitsToHookProps<E>> = Required<EmitsToHookProps<E>>,
>(props: T, reactiveProps: K[], events: E, emits: () => EP): Prettify<ReplaceProps<T, K> & EP>

export function convertCompPropToHook<
  T extends object,
  K extends keyof T,
>(props: T, reactiveProps?: K[]): Prettify<ReplaceProps<T, K>>

export function convertCompPropToHook(props: any, reactiveProps: any, _events?: any, emits?: any) {
  const result = { ...props, ...emits?.() } as Record<string, any>

  for (const field of reactiveProps) {
    result[field] = () => props[field]
  }

  return result as any
}
