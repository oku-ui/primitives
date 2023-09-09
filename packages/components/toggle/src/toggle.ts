import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, toRefs, useModel } from 'vue'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { useControllable, useForwardRef } from '@oku-ui/use-composable'

const TOGGLE_NAME = 'OkuToggle'

export type ToggleElementNaviteElement = Omit<OkuElement<'button'>, 'aria-checked' | 'aria-pressed' | 'ariaChecked'>
export type ToggleElement = Omit<HTMLButtonElement, 'aria-checked' | 'aria-pressed' | 'ariaChecked'>

export interface ToggleProps extends PrimitiveProps {
  /**
   * The controlled state of the toggle.
   */
  pressed?: boolean
  /**
   * The state of the toggle when initially rendered. Use `defaultPressed`
   * if you do not need to control the state of the toggle.
   * @defaultValue false
   */
  defaultPressed?: boolean
  disabled?: boolean
  ariaChecked?: boolean | undefined
}

export type ToggleEmits = {
  'update:modelValue': [pressed: boolean]
  /**
   * The callback that fires when the state of the toggle changes.
   */
  'pressedChange': [pressed: boolean]
  'click': [event: MouseEvent]
}

export const toggleProps = {
  props: {
    modelValue: {
      type: [Boolean] as PropType<
        boolean | undefined
      >,
      default: undefined,
    },
    pressed: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    defaultPressed: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    ariaChecked: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (pressed: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'pressedChange': (pressed: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'click': (event: MouseEvent) => true,
  },
}

const toggle = defineComponent({
  name: TOGGLE_NAME,
  inheritAttrs: false,
  props: {
    ...toggleProps.props,
    ...primitiveProps,
  },
  emits: toggleProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { pressed: pressedProp, defaultPressed, onPressedChange: _press, ...buttonProps } = toRefs(props)

    const modelValue = useModel(props, 'modelValue')

    const proxyChecked = computed({
      get: () => modelValue.value !== undefined
        ? modelValue.value
        : (pressedProp.value !== undefined
            ? pressedProp.value
            : undefined),
      set: () => {
      },
    })

    const forwardedRef = useForwardRef()

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyChecked.value),
      defaultProp: computed(() => defaultPressed.value),
      onChange: (pressed) => {
        emit('pressedChange', pressed)
        modelValue.value = pressed
      },
      initialValue: false,
    })

    const _buttonProps = reactive(buttonProps)

    const originalReturn = () => h(
      Primitive.button, {
        'type': 'button',
        'aria-checked': state.value,
        'aria-pressed': state.value ? 'true' : 'false',
        'data-state': state.value ? 'on' : 'off',
        'data-disabled': props.disabled ? '' : undefined,
        ...mergeProps(attrs, _buttonProps),
        'ref': forwardedRef,
        'onClick': composeEventHandlers<MouseEvent>((e) => {
          emit('click', e)
        }, () => {
          if (!props.disabled)
            updateValue(!state.value)
        }),
      },
      {
        default: () => slots.default?.(),
      },
    )

    return originalReturn
  },
})

export const OkuToggle = toggle as typeof toggle &
(new () => {
  $props: ToggleElementNaviteElement
})
