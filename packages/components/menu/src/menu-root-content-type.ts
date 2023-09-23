import { defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { hideOthers } from 'aria-hidden'
import type { MenuRootContentTypeElement, MenuRootContentTypeEmits, MenuRootContentTypeNaviteElement } from './props'
import { MENU_CONTENT_NAME, MENU_ROOT_CONTENT_TYPE_NAME, menuRootContentTypeProps, scopedMenuProps, useMenuInject } from './props'

const menuRootContentType = defineComponent({
  name: MENU_ROOT_CONTENT_TYPE_NAME,
  components: {
    // OkuMenuContentImpl,
  },
  inheritAttrs: false,
  props: {
    ...menuRootContentTypeProps.props,
    ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuRootContentTypeProps.emits,

  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuMenu,
    } = toRefs(props)

    const forwardedRef = useForwardRef()

    const inject = useMenuInject(MENU_CONTENT_NAME, scopeOkuMenu.value)
    const menuRootContentRef = ref<MenuRootContentTypeElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, el => menuRootContentRef.value = (el as MenuRootContentTypeElement))

    // Hide everything from ARIA except the `MenuContent`
    watchEffect(() => {
      const content = menuRootContentRef.value
      if (content)
        return hideOthers(content)
    })

    return () => h('OkuMenuContentImpl',
      {
        ...attrs,
        ref: composedRefs,
        // we make sure we're not trapping once it's been closed
        // (closed !== unmounted when animating out)
        trapFocus: inject.open.value,
        // make sure to only disable pointer events when open
        // this avoids blocking interactions while animating out
        disableOutsidePointerEvents: inject.open.value,
        // disableOutsideScroll,
        // When focus is trapped, a `focusout` event may still happen.
        // We make sure we don't trigger our `onDismiss` in such case.
        onFocusOutside: composeEventHandlers<MenuRootContentTypeEmits['focusOutside'][0]>((event) => {
          emit('focusOutside', event)
        }, (event) => {
          event.preventDefault()
        }, { checkForDefaultPrevented: false }),
        onDismiss: () => inject.onOpenChange(false),
      }, slots,
    )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuRootContentTypel = menuRootContentType as typeof menuRootContentType &
(new () => { $props: MenuRootContentTypeNaviteElement })
