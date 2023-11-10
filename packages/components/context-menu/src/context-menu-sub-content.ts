import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuMenuSubContent } from '@oku-ui/menu'
import { CONTEXT_MENU_SUB_CONTENT_NAME, contextMenuSubContentProps, scopedContextMenuProps, useMenuScope } from './props'
import type { ContextMenuSubContentNativeElement } from './props'

const contextMenuSubContent = defineComponent({
  name: CONTEXT_MENU_SUB_CONTENT_NAME,
  components: {
    OkuMenuSubContent,
  },
  inheritAttrs: false,
  props: {
    ...contextMenuSubContentProps.props,
    ...scopedContextMenuProps,
  },
  emits: contextMenuSubContentProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuContextMenu,
      ...subContentProps
    } = toRefs(props)

    const _other = reactive(subContentProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const menuScope = useMenuScope(scopeOkuContextMenu.value)

    return () => h(OkuMenuSubContent, {
      ...menuScope,
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
      style: {
        ...attrs.style as any,
        // re-namespace exposed content custom properties
        ...{
          '--oku-context-menu-content-transform-origin': 'var(--oku-popper-transform-origin)',
          '--oku-context-menu-content-available-width': 'var(--oku-popper-available-width)',
          '--oku-context-menu-content-available-height': 'var(--oku-popper-available-height)',
          '--oku-context-menu-trigger-width': 'var(--oku-popper-anchor-width)',
          '--oku-context-menu-trigger-height': 'var(--oku-popper-anchor-height)',
        },
      },
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuContextMenuSubContent = contextMenuSubContent as typeof contextMenuSubContent &
(new () => { $props: ContextMenuSubContentNativeElement })
