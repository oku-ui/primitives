import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { scopeToolbarProps } from './utils'
import { useRovingFocusGroupScope } from './toolbar'

const BUTTON_NAME = 'OkuToolbarButton'

export type ToolbarButtonNaviteElement = OkuElement<'button'>
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
    const { scopeOkuToolbar, ...buttonProps } = toRefs(props)
    const _reactive = reactive(buttonProps)
    const reactiveButtonProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const rovingFocusGroupScope = useRovingFocusGroupScope(scopeOkuToolbar.value)

    const forwardedRef = useForwardRef()

    return () => h(OkuRovingFocusGroupItem, {
      asChild: true,
      ...rovingFocusGroupScope,
      focusable: !props.disabled,
    }, {
      default: () => h(Primitive.button, {
        type: 'button',
        ...mergeProps(attrs, reactiveButtonProps),
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
  $props: ToolbarButtonNaviteElement
})
