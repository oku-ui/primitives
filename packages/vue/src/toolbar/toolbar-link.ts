import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { TOOLBAR_LINK_NAME, scopeToolbarProps, toolbarLinkProps, useRovingFocusGroupScope } from './props'
import type { ToolbarLinkEmits, ToolbarLinkNativeElement } from './props'

const toolbarLink = defineComponent({
  name: TOOLBAR_LINK_NAME,
  components: {
    OkuRovingFocusGroupItem,
  },
  inheritAttrs: false,
  props: {
    ...toolbarLinkProps.props,
    ...scopeToolbarProps,
  },
  emits: toolbarLinkProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { scopeOkuToolbar, ...linkProps } = toRefs(props)

    const _reactive = reactive(linkProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const rovingFocusGroupScope = useRovingFocusGroupScope(scopeOkuToolbar.value)

    return () => h(OkuRovingFocusGroupItem, {
      asChild: true,
      ...rovingFocusGroupScope,
      focusable: true,
    }, () => h(Primitive.a, {
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
      onKeydown: composeEventHandlers<ToolbarLinkEmits['keydown'][0]>((event) => {
        emit('keydown', event)
      }, (event) => {
        if (event.key === ' ')
          (event.currentTarget as HTMLElement).click()
      }),
    }, () => slots.default?.()))
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuToolbarLink = toolbarLink as typeof toolbarLink & (new () => { $props: ToolbarLinkNativeElement })
