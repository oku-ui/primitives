import type { VNodeProps } from 'vue'

export type ComponentProps<T> =
    T extends new () => { $props: infer P } ? NonNullable<P> :
      T extends (props: infer P, ...args: any) => any ? P :
          {}

export type MergeProps<T, U> = Omit<ComponentProps<T>, keyof VNodeProps | 'class' | 'style'> & U
