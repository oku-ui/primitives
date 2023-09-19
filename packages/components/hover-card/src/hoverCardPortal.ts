import { computed, defineComponent, h, toRefs } from 'vue'
import { OkuPortal } from '@oku-ui/portal'
import { OkuPresence } from '@oku-ui/presence'
import { scopeHoverCardProps } from './utils'

import type { HoverCardPortalNaviteElement } from './props'
import { PORTAL_NAME, hoverCardPortalProps, portalProvider, useHoverCardInject } from './props'

const hoverCardPortal = defineComponent({
  name: PORTAL_NAME,
  inheritAttrs: false,
  props: {
    ...hoverCardPortalProps.props,
    ...scopeHoverCardProps,
  },
  setup(props, { slots }) {
    const { container, forceMount, scopeOkuHoverCard } = toRefs(props)
    const inject = useHoverCardInject(PORTAL_NAME, scopeOkuHoverCard.value)

    portalProvider({
      scope: scopeOkuHoverCard.value,
      forceMount,
    })
    return () => h(OkuPresence, {
      present: computed(() => forceMount.value || inject.open.value).value,
    }, {
      default: () => h(OkuPortal, {
        asChild: true,
        container: container.value,
      }, slots),
    })
  },
})

export const OkuHoverCardPortal = hoverCardPortal as typeof hoverCardPortal &
(new () => {
  $props: HoverCardPortalNaviteElement
})
