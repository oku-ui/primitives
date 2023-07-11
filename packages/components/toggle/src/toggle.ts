import type { PropType, Ref } from 'vue'
import { defineComponent, h, toRefs } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { useControllableRef, useRef } from '@oku-ui/use-composable'

const TOGGLE_NAME = 'Toggle'

type ToggleElement = ElementType<'button'>

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
  onPressedChange?: (pressed: boolean) => void
}

const Toggle = defineComponent({
  name: TOGGLE_NAME,
  inheritAttrs: false,
  props: {
    pressed: {
      type: Boolean,
      default: undefined,
    },
    defaultPressed: {
      type: Boolean,
      default: false,
    },
    onPressedChange: Function as PropType<(pressed: boolean) => void>,
  },

  setup(props, { attrs, expose, slots }) {
    const { onPressedChange } = props
    const { pressed: pressedProp, defaultPressed } = toRefs(props)
    const { _ref: toggleRef, refEl: toggleRefEl } = useRef<ToggleElement>()

    expose({
      innerRef: toggleRefEl,
    })

    const { state } = useControllableRef({
      prop: pressedProp.value,
      onChange: onPressedChange,
      defaultProp: defaultPressed.value,
    })

    const { disabled, ...toggleProps } = attrs as ToggleElement

    const originalReturn = () => h(
      Primitive.button, {
        'type': 'button',
        'aria-pressed': state.value,
        'data-state': state.value ? 'on' : 'off',
        'data-disabled': disabled ? '' : undefined,
        ...toggleProps,
        'ref': toggleRef,
        'onClick': composeEventHandlers(toggleProps.onClick, () => {
          if (!disabled)
            state.value = !state.value
        }),
      },
      slots.default && slots.default?.(),
    )

    return originalReturn as unknown as {
      innerRef: Ref<ToggleElement>
    }
  },
})

type _ToggleProps = MergeProps<ToggleProps, ToggleElement>

type ToggleRef = RefElement<typeof Toggle>

const OkuToggle = Toggle as typeof Toggle & (new () => { $props: _ToggleProps })

export {
  OkuToggle,
}

export type {
  ToggleProps,
  ToggleElement,
  ToggleRef,
}
