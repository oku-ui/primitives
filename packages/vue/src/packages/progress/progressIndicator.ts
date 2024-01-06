import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import {
  type OkuElement,
  type PrimitiveProps,
  primitiveProps,
} from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { getProgressState, scopeProgressProps } from './utils'
import { useProgressInject } from './progress'
import { INDICATOR_NAME } from './constants'

type ProgressIndicatorNaviteElement = OkuElement<'div'>
export type ProgressIndicatorElement = HTMLDivElement

export interface ProgressIndicatorProps extends PrimitiveProps {
  scopeProgress?: Scope
}

export const progressIndicatorProps = {
  props: {
    ...primitiveProps,
  },
}

const progressIndicator = defineComponent({
  name: INDICATOR_NAME,
  inheritAttrs: true,
  props: {
    ...progressIndicatorProps.props,
    ...scopeProgressProps,
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuProgress, ...indicatorProps } = toRefs(props)
    const _reactive = reactive(indicatorProps)
    const reactiveIndicatorProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const context = useProgressInject(INDICATOR_NAME, scopeOkuProgress.value)

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
          ...mergeProps(attrs, reactiveIndicatorProps),
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
    $props: ProgressIndicatorNaviteElement
  })
