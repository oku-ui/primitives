import type { PropType } from 'vue'
import { computed, defineComponent, h, toRefs, useModel } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import type { ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { useControllable, useForwardRef } from '@oku-ui/use-composable'

const TOGGLE_NAME = 'Toggle'

type ToggleElement = ElementType<'button'>
export type _ToggleEl = HTMLButtonElement

interface ToggleProps extends IPrimitiveProps {
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

}

const Toggle = defineComponent({
  name: TOGGLE_NAME,
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Boolean, String, Number] as PropType<
        boolean | string | number | undefined
      >,
      default: undefined,
    },
    pressed: {
      type: Boolean,
      default: undefined,
    },
    defaultPressed: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:pressed', 'update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const { pressed: pressedProp, defaultPressed } = toRefs(props)
    const modelValue = useModel(props, 'modelValue')

    const forwardedRef = useForwardRef()

    const { state, updateValue } = useControllable({
      prop: computed(() => modelValue.value ?? pressedProp.value),
      defaultProp: computed(() => defaultPressed.value),
      onChange: (pressed) => {
        emit('update:pressed', pressed)
        emit('update:modelValue', pressed)
      },
    })

    const { disabled, ...toggleProps } = attrs as ToggleElement

    const originalReturn = () => h(
      Primitive.button, {
        'type': 'button',
        'aria-pressed': state.value ? 'true' : 'false',
        'data-state': state.value ? 'on' : 'off',
        'data-disabled': disabled ? '' : undefined,
        ...toggleProps,
        'ref': forwardedRef,
        'onClick': composeEventHandlers(toggleProps.onClick, () => {
          if (!disabled)
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

type _ToggleProps = MergeProps<ToggleProps, ToggleElement>

type InstanceToggleType = InstanceTypeRef<typeof Toggle, _ToggleEl>

const OkuToggle = Toggle as typeof Toggle & (new () => { $props: _ToggleProps })

export {
  OkuToggle,
}

export type {
  ToggleProps,
  ToggleElement,
  InstanceToggleType,
}
