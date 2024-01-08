import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { TOOLBAR_BUTTON_NAME, scopeToolbarProps, toolbarButtonProps, useRovingFocusGroupScope } from './props'
import type { ToolbarButtonNativeElement } from './props'

const toolbarButton = defineComponent({
  name: TOOLBAR_BUTTON_NAME,
  components: {
    OkuRovingFocusGroupItem,
  },
  inheritAttrs: false,
  props: {
    ...toolbarButtonProps.props,
    ...scopeToolbarProps,
  },
  emits: toolbarButtonProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuToolbar, ...buttonProps } = toRefs(props)

    const _reactive = reactive(buttonProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const rovingFocusGroupScope = useRovingFocusGroupScope(scopeOkuToolbar.value)

    return () => h(OkuRovingFocusGroupItem, {
      asChild: true,
      ...rovingFocusGroupScope,
      focusable: !props.disabled,
    }, () => h(Primitive.button, {
      type: 'button',
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
    }, () => slots.default?.()))
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuToolbarButton = toolbarButton as typeof toolbarButton & (new () => { $props: ToolbarButtonNativeElement })
