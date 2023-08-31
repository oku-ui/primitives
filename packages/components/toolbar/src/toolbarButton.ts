import { defineComponent, h, toRefs } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { scopeToolbarProps } from './utils'
import { useRovingFocusGroupScope } from './toolbar'

const BUTTON_NAME = 'OkuToolbarButton'

export type ToolbarButtonIntrinsicElement = ElementType<'button'>
export type ToolbarButtonElement = HTMLButtonElement

export interface ToolbarButtonProps extends PrimitiveProps {
  disabled?: boolean
}

export const toolbarButtonProps = {
  props: {
    disabled: {
      type: Boolean,
      default: undefined,
    },
    ...primitiveProps,
  },
}

const toolbarButton = defineComponent({
  name: BUTTON_NAME,
  inheritAttrs: false,
  props: {
    ...toolbarButtonProps.props,
    ...scopeToolbarProps,
  },
  setup(props, { attrs, slots }) {
    const { disabled } = toRefs(props)
    const rovingFocusGroupScope = useRovingFocusGroupScope(props.scopeOkuToolbar)

    const forwardedRef = useForwardRef()

    return () => h(OkuRovingFocusGroupItem, {
      asChild: true,
      ...rovingFocusGroupScope,
      focusable: !disabled.value,
    }, {
      default: () => h(Primitive.button, {
        type: 'button',
        ...attrs,
        ref: forwardedRef,
      }, {
        default: () => slots.default?.(),
      }),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuToolbarButton = toolbarButton as typeof toolbarButton &
(new () => {
  $props: Partial<ToolbarButtonElement>
})
