import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, toRefs, useModel } from 'vue'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { useControllable, useForwardRef } from '@oku-ui/use-composable'

const TOGGLE_NAME = 'OkuToggle'

export type ToggleElementIntrinsicElement = ElementType<'button'>
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
    const { pressed, defaultPressed, disabled, ariaChecked } = toRefs(props)
    const modelValue = useModel(props, 'modelValue')
    const proxyChecked = computed({
      get: () => modelValue.value !== undefined
        ? modelValue.value
        : (pressed.value !== undefined
            ? pressed.value
            : undefined),
      set: () => {
      },
    })

    const forwardedRef = useForwardRef()

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyChecked.value),
      defaultProp: computed(() => defaultPressed.value),
      onChange: (pressed) => {
        emit('update:modelValue', pressed)
        emit('pressedChange', pressed)
      },
      initialValue: false,
    })

    const { ...toggleAttrs } = attrs as ToggleElementIntrinsicElement

    const originalReturn = () => h(
      Primitive.button, {
        'type': 'button',
        'aria-checked': ariaChecked.value,
        'aria-pressed': state.value ? 'true' : 'false',
        'data-state': state.value ? 'on' : 'off',
        'data-disabled': disabled.value ? '' : undefined,
        ...mergeProps(toggleAttrs),
        'ref': forwardedRef,
        'asChild': props.asChild,
        'onClick': composeEventHandlers<MouseEvent>((e) => {
          emit('click', e)
        }, () => {
          if (!disabled.value)
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
  $props: Partial<ToggleElement>
})
