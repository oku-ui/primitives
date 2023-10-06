import { defineComponent, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { hideOthers } from 'aria-hidden'
import type { MenuRootContentTypeElement, MenuRootContentTypeEmits, MenuRootContentTypeNativeElement } from './props'
import { MENU_CONTENT_NAME, MENU_ROOT_CONTENT_MODAL_NAME, menuRootContentTypeProps, scopedMenuProps, useMenuInject } from './props'
import { OkuMenuContentImpl } from './menu-content-impl'

const menuRootContentModel = defineComponent({
  name: MENU_ROOT_CONTENT_MODAL_NAME,
  components: {
    OkuMenuContentImpl,
  },
  inheritAttrs: false,
  props: {
    ...menuRootContentTypeProps.props,
    // ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuRootContentTypeProps.emits,

  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuMenu,
    } = toRefs(props)

    const _reactive = reactive(menuRootContentTypeProps)
    const reactiveMenuRootContentTypeProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

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

    return () => h(OkuMenuContentImpl,
      {
        ...mergeProps(attrs, reactiveMenuRootContentTypeProps),
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
        }, event => event.preventDefault(), { checkForDefaultPrevented: false }),
        onDismiss: () => inject.onOpenChange(false),
      }, slots,
    )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuRootContentModal = menuRootContentModel as typeof menuRootContentModel &
(new () => { $props: MenuRootContentTypeNativeElement })
