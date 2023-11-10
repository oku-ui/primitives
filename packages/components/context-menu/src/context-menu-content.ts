import { defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuMenuContent } from '@oku-ui/menu'
import { CONTEXT_MENU_CONTENT_NAME, contextMenuContentProps, scopedContextMenuProps, useContextMenuInject, useMenuScope } from './props'

const contextMenuContent = defineComponent({
  name: CONTEXT_MENU_CONTENT_NAME,
  components: {
    OkuMenuContent,
  },
  inheritAttrs: false,
  props: {
    ...contextMenuContentProps.props,
    ...scopedContextMenuProps,
  },
  emits: contextMenuContentProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuContextMenu,
      ...contentProps
    } = toRefs(props)

    const _other = reactive(contentProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const inject = useContextMenuInject(CONTEXT_MENU_CONTENT_NAME, scopeOkuContextMenu.value)
    const menuScope = useMenuScope(scopeOkuContextMenu.value)
    const hasInteractedOutsideRef = ref(false)

    return () => h(OkuMenuContent, {
      ...menuScope,
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
      side: 'right',
      sideOffset: 2,
      align: 'start',
      onCloseAutoFocus: (event) => {
        emit('closeAutoFocus', event)

        if (!event.defaultPrevented && hasInteractedOutsideRef.value)
          event.preventDefault()

        hasInteractedOutsideRef.value = false
      },
      onInteractOutside: (event) => {
        emit('interactOutside', event)

        if (!event.defaultPrevented && !inject.modal.value)
          hasInteractedOutsideRef.value = true
      },
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

export const OkuContextMenuContent = contextMenuContent
