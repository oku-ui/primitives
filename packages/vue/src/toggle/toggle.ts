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

    const pressedProxy = computed(() => {
      if (pressedProp.value === undefined && modelValue.value === undefined)
        return undefined
      if (pressedProp.value !== undefined)
        return pressedProp.value
      if (modelValue.value !== undefined)
        return modelValue.value
    })

    const [pressed, setPressed] = useControllable({
      prop: computed(() => pressedProxy.value),
      defaultProp: computed(() => defaultPressed.value),
      onChange: (result) => {
        emit('pressedChange', result)
        emit('update:modelValue', result)
      },
      initialValue: false,
    })

    return () => h(Primitive.button, {
      'type': 'button',
      'aria-pressed': pressed.value,
      'data-state': pressed.value ? 'on' : 'off',
      'data-disabled': props.disabled ? '' : undefined,
      ...mergeProps(attrs, otherProps, emits),
      'ref': forwardedRef,
      'onClick': composeEventHandlers<ToggleEmits['click'][0]>((event) => {
        emit('click', event)
      }, () => {
        if (!props.disabled)
          setPressed(!pressed.value)
      }),
    }, () => slots.default?.())
  },
})

export const OkuToggle = toggle as typeof toggle & (new () => { $props: ToggleNativeElement })
