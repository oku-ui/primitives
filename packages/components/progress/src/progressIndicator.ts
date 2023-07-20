import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import type {
  ElementType,
  MergeProps,
  PrimitiveProps,
  RefElement,
} from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { useRef } from '@oku-ui/use-composable'
import { getProgressState } from './utils'
import { useProgressContext } from './progress'
import { INDICATOR_NAME } from './constants'

// ---component---
type ProgressIndicatorElement = ElementType<'div'>

interface ProgressIndicatorProps extends PrimitiveProps {
  scopeProgress?: Scope
}

const ProgressIndicator = defineComponent({
  name: INDICATOR_NAME,
  inheritAttrs: true,
  props: {
    scopeProgress: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { scopeProgress } = props
    const { ...indicatorProps } = attrs as ProgressIndicatorProps

    const { $el, newRef } = useRef<HTMLDivElement>()

    const context = useProgressContext(INDICATOR_NAME, scopeProgress)

    expose({
      inferRef: $el,
    })

    const originalReturn = () =>
      h(
        'div',
        {
          'data-state': getProgressState(
            context.value.max.value,
            context.value.value?.value,
          ),
          'data-value': context.value.value?.value ?? undefined,
          'data-max': context.value.max.value,
          ...indicatorProps,
          'ref': newRef,
        },
        {
          default: () => slots.default?.(),
        },
      )

    return originalReturn as unknown as {
      innerRef: ProgressIndicatorElement
    }
  },
})

type _OkuProgressIndicatorProps = MergeProps<
  ProgressIndicatorProps,
  PrimitiveProps
>

const OkuProgressIndicator = ProgressIndicator as typeof ProgressIndicator &
(new () => { $props: _OkuProgressIndicatorProps })

type ProgressIndicatorRef = RefElement<typeof ProgressIndicator>

export { OkuProgressIndicator }

export type {
  ProgressIndicatorProps,
  ProgressIndicatorElement,
  ProgressIndicatorRef,
}
