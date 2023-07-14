import type { PropType, Ref } from 'vue'
import { defineComponent, h, useModel } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { useRef } from '@oku-ui/use-composable'

const TOGGLE_NAME = 'Toggle'

type ToggleElement = ElementType<'button'>

interface ToggleProps extends PrimitiveProps {
  /**
   * The controlled state of the toggle.
   */
  pressed?: boolean

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
      default: false,
    },
  },
  emits: ['update:pressed'],
  setup(props, { attrs, expose, slots }) {
    const { $el, newRef } = useRef<ToggleElement>()
    const pressed = useModel(props, 'pressed')

    expose({
      innerRef: $el,
    })

    const { disabled, ...toggleProps } = attrs as ToggleElement

    const originalReturn = () => h(
      Primitive.button, {
        'type': 'button',
        'aria-pressed': pressed.value,
        'data-state': pressed.value ? 'on' : 'off',
        'data-disabled': disabled ? '' : undefined,
        ...toggleProps,
        'ref': newRef,
        'onClick': composeEventHandlers(toggleProps.onClick, () => {
          if (!disabled)
            pressed.value = !pressed.value
        }),
      },
      {
        default: () => slots.default?.(),
      },
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
