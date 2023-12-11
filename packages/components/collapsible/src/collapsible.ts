import { computed, defineComponent, h, mergeProps, reactive, toRefs, useModel } from 'vue'
import { reactiveOmit, useControllable, useForwardRef, useId, useListeners } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { getState } from './utils'
import { COLLAPSIBLE_NAME, collapsibleProps, collapsibleProvider, scopeCollapsibleProps } from './props'
import type { CollapsibleNativeElement } from './props'

const collapsible = defineComponent({
  name: COLLAPSIBLE_NAME,
  inheritAttrs: false,
  props: {
    ...collapsibleProps.props,
    ...scopeCollapsibleProps,
  },
  emits: collapsibleProps.emits,
  setup(props, { attrs, slots, emit }) {
    const {
      scopeOkuCollapsible,
      open: openProp,
      defaultOpen,
      disabled,
      ...collapsibleProps
    } = toRefs(props)

    const _reactive = reactive(collapsibleProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const modelValue = useModel(props, 'modelValue')
    const proxyOpen = computed({
      get: () => modelValue.value !== undefined ? modelValue.value : openProp.value !== undefined ? openProp.value : undefined,
      set: () => { },
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyOpen.value),
      defaultProp: computed(() => defaultOpen.value),
      onChange: (open) => {
        modelValue.value = open
        emit('openChange', open)
        emit('update:modelValue', open)
      },
      initialValue: false,
    })

    collapsibleProvider({
      scope: scopeOkuCollapsible.value,
      disabled,
      contentId: computed(() => useId()),
      open: state,
      onOpenToggle: () => updateValue(!state.value),
    })

    return () => h(Primitive.div, {
      'data-state': getState(state.value),
      'data-disabled': disabled.value ? '' : undefined,
      ...mergeProps(attrs, otherProps, emits),
      'ref': forwardedRef,
    }, () => slots.default?.())
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuCollapsible = collapsible as typeof collapsible & (new () => { $props: CollapsibleNativeElement })
