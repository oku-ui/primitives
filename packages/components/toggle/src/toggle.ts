import type { PropType } from 'vue'
import { computed, defineComponent, h, toRefs, useModel } from 'vue'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { useControllable, useForwardRef } from '@oku-ui/use-composable'

const TOGGLE_NAME = 'OkuToggle'

export type ToggleElementIntrinsicElement = ElementType<'button'>
export type ToggleElement = HTMLButtonElement

interface ToggleProps extends PrimitiveProps {
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

  /**
   * The callback that fires when the state of the toggle changes.
   */
  onPressedChange?(pressed: boolean): void
}

const toggleProps = {
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
  onClick: {
    type: Function as PropType<(event: MouseEvent) => void>,
    default: undefined,
  },
  onPressedChange: {
    type: Function as PropType<(pressed: boolean) => void>,
    default: undefined,
  },
}

const Toggle = defineComponent({
  name: TOGGLE_NAME,
  inheritAttrs: false,
  props: {
    ...toggleProps,
    ...primitiveProps,
  },
  emits: ['update:pressed', 'update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const { pressed, defaultPressed, disabled } = toRefs(props)
    const modelValue = useModel(props, 'modelValue')

    const forwardedRef = useForwardRef()

    const { state, updateValue } = useControllable({
      prop: computed(() => modelValue.value ?? pressed.value),
      defaultProp: computed(() => defaultPressed.value),
      onChange: (pressed) => {
        emit('update:modelValue', pressed)
        props.onPressedChange?.(pressed)
      },
    })

    const { ...toggleAttrs } = attrs as ToggleElementIntrinsicElement

    const originalReturn = () => h(
      Primitive.button, {
        'type': 'button',
        'aria-pressed': state.value ? 'true' : 'false',
        'data-state': state.value ? 'on' : 'off',
        'data-disabled': disabled.value ? '' : undefined,
        ...toggleAttrs,
        'ref': forwardedRef,
        'asChild': props.asChild,
        'onClick': composeEventHandlers(props.onClick, () => {
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

export const OkuToggle = Toggle as typeof Toggle &
(new () => {
  $props: Partial<ToggleElement>
})

export type {
  ToggleProps,
}
