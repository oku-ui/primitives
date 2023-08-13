import { defineComponent, h } from 'vue'
import type {
  ElementType,
  IPrimitiveProps,
  InstanceTypeRef,
  MergeProps,
} from '@oku-ui/primitive'
import { type Scope, ScopePropObject } from '@oku-ui/provide'
import { useForwardRef } from '@oku-ui/use-composable'
import { getProgressState } from './utils'
import { useProgressContext } from './progress'
import { INDICATOR_NAME } from './constants'

type ProgressIndicatorElement = ElementType<'div'>
export type _ProgressIndicatorEl = HTMLDivElement

interface ProgressIndicatorProps extends IPrimitiveProps {
  scopeProgress?: Scope
}

const ProgressIndicator = defineComponent({
  name: INDICATOR_NAME,
  inheritAttrs: true,
  props: {
    scopeProgress: {
      ...ScopePropObject,
    },
  },
  setup(props, { attrs, slots }) {
    const { ...indicatorProps } = attrs as ProgressIndicatorProps

    const forwardedRef = useForwardRef()

    const context = useProgressContext(INDICATOR_NAME, props.scopeProgress)

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
          ...indicatorProps,
          'ref': forwardedRef,
        },
        {
          default: () => slots.default?.(),
        },
      )

    return originalReturn
  },
})

type _OkuProgressIndicatorProps = MergeProps<
  ProgressIndicatorProps,
  ProgressIndicatorElement
>
type InstanceProgressIndicatorType = InstanceTypeRef<typeof ProgressIndicator, _ProgressIndicatorEl>

const OkuProgressIndicator = ProgressIndicator as typeof ProgressIndicator &
(new () => { $props: _OkuProgressIndicatorProps })

export { OkuProgressIndicator }

export type {
  ProgressIndicatorProps,
  ProgressIndicatorElement,
  InstanceProgressIndicatorType,
}
