import { defineComponent, h } from 'vue'
import {
  type ElementType,
  type PrimitiveProps,
  primitiveProps,
} from '@oku-ui/primitive'
import { type Scope } from '@oku-ui/provide'
import { useForwardRef } from '@oku-ui/use-composable'
import type { ScopeProgress } from './utils'
import { getProgressState, scopeProgressProps } from './utils'
import { useProgressInject } from './progress'
import { INDICATOR_NAME } from './constants'

type ProgressIndicatorElementIntrinsicElement = ElementType<'div'>
export type ProgressIndicatorElement = HTMLDivElement

interface ProgressIndicatorProps extends PrimitiveProps {
  scopeProgress?: Scope
}

const progressIndicator = defineComponent({
  name: INDICATOR_NAME,
  inheritAttrs: true,
  props: {
    ...scopeProgressProps,
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const { ...indicatorAttrs } = attrs as ProgressIndicatorElementIntrinsicElement

    const forwardedRef = useForwardRef()

    const context = useProgressInject(INDICATOR_NAME, props.scopeOkuProgress)

    const originalReturn = () =>
      h(
        'div',
        {
          'data-state': getProgressState(
            context.max.value,
            context.value?.value,
          ),
          'data-value': context.value?.value ?? undefined,
          'data-max': context.max.value,
          ...indicatorAttrs,
          'ref': forwardedRef,
        },
        {
          default: () => slots.default?.(),
        },
      )

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuProgressIndicator = progressIndicator as typeof progressIndicator &
(new () => {
  $props: ScopeProgress<Partial<ProgressIndicatorElement>>
})

export type { ProgressIndicatorProps }
