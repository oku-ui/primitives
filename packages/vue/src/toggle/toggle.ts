import { computed, defineComponent, h, mergeProps, reactive, toRefs, useModel } from 'vue'
import { reactiveOmit, useControllable, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { Primitive } from '@oku-ui/primitive'
import { TOGGLE_NAME, toggleProps } from './props'
import type { ToggleEmits, ToggleNativeElement } from './props'

const toggle = defineComponent({
  name: TOGGLE_NAME,
  inheritAttrs: false,
  props: toggleProps.props,
  emits: toggleProps.emits,
  setup(props, { attrs, slots, emit }) {
    const {
      pressed: pressedProp,
      defaultPressed,
      ...buttonProps
    } = toRefs(props)

    const _reactive = reactive(buttonProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const modelValue = useModel(props, 'modelValue')
    const proxyChecked = computed({
      get: () => modelValue.value !== undefined ? modelValue.value : pressedProp.value !== undefined ? pressedProp.value : undefined,
      set: () => { },
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyChecked.value),
      defaultProp: computed(() => defaultPressed.value),
      onChange: (result: any) => {
        modelValue.value = result
        emit('pressedChange', result)
        emit('update:modelValue', result)
      },
      initialValue: false,
    })

    return () => h(Primitive.button, {
      'type': 'button',
      'aria-pressed': state.value,
      'data-state': state.value ? 'on' : 'off',
      'data-disabled': props.disabled ? '' : undefined,
      ...mergeProps(attrs, otherProps, emits),
      'ref': forwardedRef,
      'onClick': composeEventHandlers<ToggleEmits['click'][0]>((event) => {
        emit('click', event)
      }, () => {
        if (!props.disabled)
          updateValue(!state.value)
      }),
    }, () => slots.default?.())
  },
})

export const OkuToggle = toggle as typeof toggle & (new () => { $props: ToggleNativeElement })
