import { defineComponent, h, mergeProps } from 'vue'
import {
  OkuPortal,
  type PortalElementNaviteElement,
  portalProps,
} from '@oku-ui/portal'
import { PORTAL_NAME } from './props'

const SelectPortal = defineComponent({
  name: PORTAL_NAME,
  inheritAttrs: false,
  props: {
    ...portalProps.props,
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        OkuPortal,
        {
          asChild: true,
          ...mergeProps(attrs, props),
        },
        slots,
      )
  },
})

export const OkuSelectPortal = SelectPortal as typeof SelectPortal &
(new () => {
  $props: PortalElementNaviteElement
})
