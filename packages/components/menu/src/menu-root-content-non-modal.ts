import { defineComponent, h, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { primitiveProps } from '@oku-ui/primitive'
import { MENU_CONTENT_NAME, MENU_NON_MODEL_NAME, menuRootContentNonModalProps, scopedMenuProps, useMenuInject } from './props'
import type { MenuPortalNaviteElement } from './props'

const menuRootContentNonModal = defineComponent({
  name: MENU_NON_MODEL_NAME,
  components: {
    // OkuMenuContentImpl,
  },
  inheritAttrs: false,
  props: {
    ...menuRootContentNonModalProps.props,
    ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuRootContentNonModalProps.emits,

  setup(props, { attrs, slots }) {
    const { scopeOkuMenu } = toRefs(props)

    const forwardedRef = useForwardRef()

    const inject = useMenuInject(MENU_CONTENT_NAME, scopeOkuMenu.value)

    return () => h('OkuMenuContentImpl',
      {
        ...attrs,
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
(new () => { $props: MenuPortalNaviteElement })
