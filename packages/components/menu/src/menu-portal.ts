import { defineComponent, h, toRefs } from 'vue'
import { OkuPresence } from '@oku-ui/presence'
import { OkuPortal } from '@oku-ui/portal'
import type { MenuPortalNativeElement } from './props'
import { MENU_PORTAL_NAME, menuPortalProps, portalProvider, scopedMenuProps, useMenuInject } from './props'

const menuPortal = defineComponent({
  name: MENU_PORTAL_NAME,
  components: {
    OkuPresence,
    OkuPortal,
  },
  inheritAttrs: false,
  props: {
    ...menuPortalProps.props,
    ...scopedMenuProps,
  },
  setup(props, { slots }) {
    const {
      scopeOkuMenu,
      forceMount,
      container,
    } = toRefs(props)

    const inject = useMenuInject(MENU_PORTAL_NAME, scopeOkuMenu.value)

    portalProvider({
      scope: props.scopeOkuMenu,
      forceMount,
    })

    return () => h(OkuPresence,
      { present: forceMount.value || inject.open.value },
      {
        default: () => h(OkuPortal,
          {
            asChild: true,
            container: container.value,
          }, slots,
        ),
      },
    )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuPortal = menuPortal as typeof menuPortal &
(new () => { $props: MenuPortalNativeElement })
