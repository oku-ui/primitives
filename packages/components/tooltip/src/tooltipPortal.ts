import type { PropType, Ref } from 'vue'
import { defineComponent, h, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { OkuPortal, type PortalProps as OkuPortalProps, type PortalElement } from '@oku-ui/portal'
import { OkuPresence } from '@oku-ui/presence'
import { createTooltipProvide } from './utils'
import type { ScopeTooltip } from './types'
import { scopeTooltipProps } from './types'
import { useTooltipInject } from './tooltip'

// export type LabelIntrinsicElement = ElementType<'label'>
// export type LabelElement = HTMLLabelElement

const PORTAL_NAME = 'OkuTooltipPortal'

type PortalProvide = {
  forceMount?: Ref<true | undefined>
}
const [portalProvider, usePortalInject] = createTooltipProvide<PortalProvide>(PORTAL_NAME, {
  forceMount: undefined,
})

export { usePortalInject }

type PortalProps = OkuPortalProps

export interface TooltipPortalProps {
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

export const tooltipPortalProps = {
  props: {
    container: {
      type: Object as PropType<PortalProps['container']>,
      default: undefined,
    },
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: true,
    },
    ...primitiveProps,
  },
}

const tooltipPortal = defineComponent({
  name: PORTAL_NAME,
  inheritAttrs: false,
  props: {
    ...tooltipPortalProps.props,
    ...scopeTooltipProps,
  },
  setup(props, { attrs, slots }) {
    const { container, forceMount } = toRefs(props)
    const inject = useTooltipInject(PORTAL_NAME, props.scopeOkuTooltip)

    portalProvider({
      scope: props.scopeOkuTooltip,
      forceMount,
    })

    return () => h(OkuPresence, {
      present: forceMount.value || inject.open.value,
    }, {
      default: () => h(OkuPortal, {
        asChild: true,
        container: container.value,
      }, {
        default: () => slots.default?.(),
      }),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuTooltipPortal = tooltipPortal as typeof tooltipPortal &
(new () => {
  $props: ScopeTooltip<Partial<PortalElement>>
})
