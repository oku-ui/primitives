import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { OkuPresence } from '@oku-ui/presence'
import { OkuPortal } from '@oku-ui/portal'
import { reactiveOmit } from '@oku-ui/use-composable'
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
  setup(props, { attrs, slots }) {
    const {
      scopeOkuMenu,
      forceMount,
      container,
      ...restProps
    } = toRefs(props)

    const _other = reactive(restProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

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
            ...mergeProps(attrs, otherProps),
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
