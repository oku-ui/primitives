import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { Primitive } from '@oku-ui/primitive'
import { getState } from './utils'
import { COLLAPSIBLE_TRIGGER_NAME, collapsibleTriggerProps, scopeCollapsibleProps, useCollapsibleInject } from './props'
import type { CollapsibleTriggerEmits, CollapsibleTriggerNativeElement } from './props'

const collapsibleTrigger = defineComponent({
  name: COLLAPSIBLE_TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    ...collapsibleTriggerProps.props,
    ...scopeCollapsibleProps,
  },
  emits: collapsibleTriggerProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { scopeOkuCollapsible, ...triggerProps } = toRefs(props)

    const _reactive = reactive(triggerProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const inject = useCollapsibleInject(COLLAPSIBLE_TRIGGER_NAME, scopeOkuCollapsible.value)

    return () => h(Primitive.button, {
      'type': 'button',
      'aria-controls': inject.contentId.value,
      'aria-expanded': inject.open.value || false,
      'data-state': getState(inject.open.value),
      'data-disabled': inject.disabled?.value ? '' : undefined,
      'disabled': inject.disabled?.value,
      ...mergeProps(attrs, otherProps, emits),
      'ref': forwardedRef,
      'onClick': composeEventHandlers<CollapsibleTriggerEmits['click'][0]>((event) => {
        emit('click', event)
      }, inject.onOpenToggle),
    }, () => slots.default?.())
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuCollapsibleTrigger = collapsibleTrigger as typeof collapsibleTrigger & (new () => { $props: CollapsibleTriggerNativeElement })
