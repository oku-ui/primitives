import type { PortalProps as OkuPortalProps, PortalElement, PortalElementNaviteElement } from '@oku-ui/portal'
import type { PropType, Ref } from 'vue'
import { OkuPortal } from '@oku-ui/portal'
import { OkuPresence } from '@oku-ui/presence'
import { primitiveProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, toRefs } from 'vue'
import { useHoverCardInject } from './hoverCard'
import { createHoverCardProvide, scopeHoverCardProps } from './utils'

const PORTAL_NAME = 'OkuHoverCardPortal'

export type HoverCardPortalElement = PortalElement
export type HoverCardPortalNaviteElement = PortalElementNaviteElement

type PortalProvide = {
  forceMount?: Ref<true | undefined>
}
const [portalProvider, usePortalInject] = createHoverCardProvide<PortalProvide>(PORTAL_NAME, {
  forceMount: undefined,
})

export { usePortalInject }

type PortalProps = OkuPortalProps

export interface HoverCardPortalProps {
  /**
   * Specify a container element to portal the content into.
   */
  container?: PortalProps['container']
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export const hoverCardPortalProps = {
  props: {
    container: {
      type: Object as PropType<PortalProps['container']>,
      default: undefined,
    },
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
    ...primitiveProps,
  },
}

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
