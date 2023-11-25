import { defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuMenuContent } from '@oku-ui/menu'
import { DROPDOWN_MENU_CONTENT_NAME, dropdownMenuContentProps, scopedDropdownMenuProps, useDropdownMenuInject, useMenuScope } from './props'
import type { DropdownMenuContentEmits } from './props'

const dropdownMenuContent = defineComponent({
  name: DROPDOWN_MENU_CONTENT_NAME,
  components: {
    OkuMenuContent,
  },
  inheritAttrs: false,
  props: {
    ...dropdownMenuContentProps.props,
    ...scopedDropdownMenuProps,
  },
  emits: dropdownMenuContentProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuDropdownMenu,
      ...contentProps
    } = toRefs(props)

    const _other = reactive(contentProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const inject = useDropdownMenuInject(DROPDOWN_MENU_CONTENT_NAME, scopeOkuDropdownMenu.value)
    const menuScope = useMenuScope(scopeOkuDropdownMenu.value)
    const hasInteractedOutsideRef = ref(false)

    return () => h(OkuMenuContent, {
      'id': inject.contentId.value,
      'aria-labelledby': inject.triggerId.value,
      ...menuScope,
      ...mergeProps(attrs, otherProps, emits),
      'ref': forwardedRef,
      'onCloseAutoFocus': composeEventHandlers<DropdownMenuContentEmits['closeAutoFocus'][0]>((event) => {
        emit('closeAutoFocus', event)
      }, (event) => {
        if (!hasInteractedOutsideRef.value)
          inject.triggerRef.value?.focus()
        hasInteractedOutsideRef.value = false
        // Always prevent auto focus because we either focus manually or want user agent focus
        event.preventDefault()
      }),
      'onInteractOutside': composeEventHandlers<DropdownMenuContentEmits['interactOutside'][0]>((event) => {
        emit('interactOutside', event)
      }, (event) => {
        const originalEvent = event.detail.originalEvent as PointerEvent
        const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true
        const isRightClick = originalEvent.button === 2 || ctrlLeftClick
        if (!inject.modal.value || isRightClick)
          hasInteractedOutsideRef.value = true
      }),
      'style': {
        ...attrs.style as any,
        // re-namespace exposed content custom properties
        ...{
          '--oku-dropdown-menu-content-transform-origin': 'var(--oku-popper-transform-origin)',
          '--oku-dropdown-menu-content-available-width': 'var(--oku-popper-available-width)',
          '--oku-dropdown-menu-content-available-height': 'var(--oku-popper-available-height)',
          '--oku-dropdown-menu-trigger-width': 'var(--oku-popper-anchor-width)',
          '--oku-dropdown-menu-trigger-height': 'var(--oku-popper-anchor-height)',
        },
      },
    }, slots)
  },
})

export const OkuDropdownMenuContent = dropdownMenuContent
