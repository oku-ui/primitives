import type { PropType, Ref } from 'vue'
import { Transition, defineComponent, h, toRefs } from 'vue'

import { useRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'

import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'

import type { Scope } from '@oku-ui/provide'
import { getState, isIndeterminate } from './utils'
import { useCheckboxInject } from './checkbox'

type CheckboxIndicatorElement = ElementType<'span'>

interface CheckboxIndicatorProps extends PrimitiveProps {
  forceMount?: true
}

const INDICATOR_NAME = 'OkuCheckboxIndicator'

const CheckboxIndicator = defineComponent({
  name: INDICATOR_NAME,
  components: { Transition },
  props: {
    scopeCheckbox: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
    forceMount: Boolean,
  },
  setup(props, { attrs, expose, slots }) {
    const { scopeCheckbox, forceMount } = toRefs(props)
    const { ...indicatorProps } = attrs as CheckboxIndicatorElement
    const { $el, newRef } = useRef<CheckboxIndicatorElement>()
    expose({
      innerRef: $el,
    })

    const context = useCheckboxInject(INDICATOR_NAME, scopeCheckbox.value)

    const originalReturn = () => h(Transition, {}, {
      default: () => (forceMount.value || isIndeterminate(context.value.state.value) || context.value.state.value === true)
        ? h(Primitive.span, {
          'ref': newRef,
          'data-state': getState(context.value.state.value),
          'data-disabled': context.value.disabled ? '' : undefined,
          ...indicatorProps,
          'style': { pointerEvents: 'none', ...attrs.style as any },
        },
        {
          default: () => slots.default?.(),
        },
        )
        : null,
    })

    return originalReturn as unknown as {
      innerRef: Ref<HTMLButtonElement>
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _OkuCheckboxIndicatorProps = MergeProps<CheckboxIndicatorProps, CheckboxIndicatorElement>

type CheckboxIndicatorRef = RefElement<typeof OkuCheckboxIndicator>

const OkuCheckboxIndicator = CheckboxIndicator as typeof CheckboxIndicator & (new () => { $props: _OkuCheckboxIndicatorProps })

export {
  OkuCheckboxIndicator,
}

export type {
  CheckboxIndicatorProps,
  CheckboxIndicatorElement,
  CheckboxIndicatorRef,
}
