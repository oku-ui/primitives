import { computed, defineComponent, h, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { OkuPresence } from '@oku-ui/presence'
import { OkuPortal } from '@oku-ui/portal'
import type { MenuPortalNaviteElement } from './props'
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
    ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuPortalProps.emits,
  setup(props, { attrs, slots }) {
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
      { present: computed(() => forceMount.value || inject.open.value).value },
      {
        default: () => h(OkuPortal,
          {
            ...attrs,
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
(new () => { $props: MenuPortalNaviteElement })
