import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { MENU_CONTENT_NAME, MENU_NON_MODAL_NAME, menuRootContentNonModalProps, scopedMenuProps, useMenuInject } from './props'
import type { MenuPortalNativeElement } from './props'
import { OkuMenuContentImpl } from './menu-content-impl'

const menuRootContentNonModal = defineComponent({
  name: MENU_NON_MODAL_NAME,
  components: {
    OkuMenuContentImpl,
  },
  inheritAttrs: false,
  props: {
    ...menuRootContentNonModalProps.props,
    ...scopedMenuProps,
  },
  setup(props, { attrs, slots }) {
    const {
      scopeOkuMenu,
      ...restProps
    } = toRefs(props)

    const _other = reactive(restProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useMenuInject(MENU_CONTENT_NAME, scopeOkuMenu.value)

    return () => h(OkuMenuContentImpl,
      {
        ...mergeProps(attrs, otherProps),
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        disableOutsideScroll: false,
        onDismiss: () => inject.onOpenChange(false),
      }, slots,
    )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuRootContentNonModal = menuRootContentNonModal as typeof menuRootContentNonModal &
(new () => { $props: MenuPortalNativeElement })
