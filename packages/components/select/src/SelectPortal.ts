import { defineComponent, h, mergeProps, toRefs } from 'vue'
import {
  OkuPortal,
  type PortalElementNaviteElement,
  type PortalProps,
  portalProps,
} from '@oku-ui/portal'

const PORTAL_NAME = 'OkuSelectPortal'

export interface SelectPortalProps {
  /**
   * Specify a container element to portal the content into.
   */
  container?: PortalProps['container']
}

const SelectPortal = defineComponent({
  name: PORTAL_NAME,
  inheritAttrs: false,
  props: {
    ...portalProps.props,
  },
  setup(props, { attrs, slots }) {
    const { ...selectPortalProps } = toRefs(props)

    return () =>
      h(
        OkuPortal,
        {
          asChild: true,
          ...mergeProps(attrs, selectPortalProps),
        },
        slots,
      )
  },
})

export const OkuSelectPortal = SelectPortal as typeof SelectPortal &
(new () => {
  $props: PortalElementNaviteElement
})
