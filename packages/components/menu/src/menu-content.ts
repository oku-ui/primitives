import { computed, defineComponent, h, toRefs } from 'vue'
import { OkuPresence } from '@oku-ui/presence'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { MenuContentNaviteElement } from './props'
import { CollectionProvider, CollectionSlot, MENU_CONTENT_NAME, menuContentProps, scopedMenuProps, useMenuInject, useMenuRootInject, usePortalInject } from './props'

const menuContent = defineComponent({
  name: MENU_CONTENT_NAME,
  components: {
    OkuPresence,
    // OkuMenuContentModal,
    // OkuMenuContentNonModal,
  },
  inheritAttrs: false,
  props: {
    ...menuContentProps.props,
    ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuContentProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuMenu,
      forceMount,
    } = toRefs(props)

    const portalInject = usePortalInject(MENU_CONTENT_NAME, props.scopeOkuMenu)
    forceMount.value = portalInject.forceMount.value

    const forwardedRef = useForwardRef()

    const inject = useMenuInject(MENU_CONTENT_NAME, scopeOkuMenu.value)
    const rootInject = useMenuRootInject(MENU_CONTENT_NAME, scopeOkuMenu.value)

    return () => h(CollectionProvider,
      {
        scope: scopeOkuMenu.value,
      },
      {
        default: () => h(OkuPresence,
          { present: computed(() => forceMount.value || inject.open.value).value },
          {
            default: () => h(CollectionSlot,
              {
                scope: scopeOkuMenu.value,
              },
              {
                default: () => rootInject.modal.value
                  ? h('OkuMenuContentModal',
                    {
                      ...attrs,
                      ref: forwardedRef,
                    }, slots,
                  )
                  : h('OkuMenuContentNonModal',
                    {
                      ...attrs,
                      ref: forwardedRef,
                    }, slots,
                  ),
              },
            ),
          },
        ),
      },
    )
  },

})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuContent = menuContent as typeof menuContent &
(new () => { $props: MenuContentNaviteElement })
