import type { PropType } from 'vue'
import { computed, defineComponent, h, ref, toRefs } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'

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
    const innerRef = ref()
    const _innerRef = computed(() => innerRef.value?.$el)

    expose({
      innerRef: _innerRef,
    })

    const isControlled = computed(() => pressedProp.value !== undefined)
    const uncontrolledValue = ref(defaultPressed.value)
    const pressed = computed(() => (isControlled.value ? pressedProp.value : uncontrolledValue.value))

    function setPressed(value: boolean) {
      if (isControlled.value)
        onPressedChange?.(value)

      else
        uncontrolledValue.value = value
    }

    const { disabled, ...toggleProps } = attrs as ToggleElement

    const originalReturn = () => h(
      Primitive.button, {
        'type': 'button',
        'aria-pressed': pressed.value,
        'data-state': pressed.value ? 'on' : 'off',
        'data-disabled': disabled ? '' : undefined,
        ...toggleProps,
        'ref': innerRef,
        'onClick': composeEventHandlers(toggleProps.onClick, () => {
          if (!disabled)
            setPressed(!pressed.value)
        }),
      },
      slots.default && slots.default?.(),
      )

    return originalReturn as unknown as {
      innerRef: ToggleElement
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
