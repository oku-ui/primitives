import { defineComponent, h, toRefs } from 'vue'
import { OkuPortal } from '@oku-ui/portal'
import { OkuPresence } from '@oku-ui/presence'
import { PORTAL_NAME, popoverPortalProps, portalProvider, scopePopoverProps, usePopoverInject } from './props'

const popoverPortal = defineComponent({
  name: PORTAL_NAME,
  inheritAttrs: false,
  props: {
    ...popoverPortalProps.props,
    ...scopePopoverProps,
  },
  setup(props, { slots }) {
    const { container, forceMount, scopeOkuPopover } = toRefs(props)

    const inject = usePopoverInject(PORTAL_NAME, scopeOkuPopover?.value)

    portalProvider({
      scope: scopeOkuPopover?.value,
      forceMount,
    })

    return () => h(OkuPresence, {
      present: forceMount?.value || inject.open.value,
    }, () => h(OkuPortal, {
      asChild: true,
      container: container?.value,
    }, () => slots.default?.()))
  },
})

export const OkuPopoverPortal = popoverPortal
