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

  disabled?: boolean
}

export const toggleProps = {
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
}

const Toggle = defineComponent({
  name: TOGGLE_NAME,
  inheritAttrs: false,
  props: {
    ...toggleProps,
    ...primitiveProps,
  },
  emits: {
    'update:modelValue': (pressed: boolean) => true,
    'pressedChange': (pressed: boolean) => true,
    'click': (event: MouseEvent) => true,
  },
  setup(props, { attrs, slots, emit }) {
    const { pressed, defaultPressed, disabled } = toRefs(props)
    const modelValue = useModel(props, 'modelValue')
    const proxyChecked = computed({
      get: () => modelValue.value !== undefined
        ? modelValue.value
        : (pressed.value !== undefined ? pressed.value : undefined),
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

export const OkuToggle = Toggle as typeof Toggle &
(new () => {
  $props: Partial<ToggleElement>
})

export type {
  ToggleProps,
}
