import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { OkuPresence } from '@oku-ui/presence'
import { getState, isIndeterminate } from './utils'
import { CHECKBOX_INDICATOR_NAME, checkboxIndicatorProps, scopeCheckboxProps, useCheckboxInject } from './props'
import type { CheckboxIndicatorNativeElement } from './props'

const checkboxIndicator = defineComponent({
  name: CHECKBOX_INDICATOR_NAME,
  props: {
    ...checkboxIndicatorProps.props,
    ...scopeCheckboxProps,
  },
  emits: {
    ...checkboxIndicatorProps.emits,
  },
  setup(props, { attrs, slots }) {
    const {
      scopeOkuCheckbox,
      forceMount,
      ...indicatorProps
    } = toRefs(props)

    const _reactive = reactive(indicatorProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const inject = useCheckboxInject(CHECKBOX_INDICATOR_NAME, scopeOkuCheckbox.value)

    return () => h(OkuPresence, {
      present: computed(() => forceMount.value || isIndeterminate(inject.state.value) || inject.state.value === true).value,
    }, () => h(Primitive.span, {
      'data-state': computed(() => getState(inject.state.value)).value,
      'data-disabled': inject.disabled?.value ? '' : undefined,
      ...mergeProps(attrs, otherProps, emits),
      'ref': forwardedRef,
      'style': { pointerEvents: 'none', ...attrs.style as any },
    }, () => slots.default?.()))
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuCheckboxIndicator = checkboxIndicator as typeof checkboxIndicator & (new () => { $props: CheckboxIndicatorNativeElement })
