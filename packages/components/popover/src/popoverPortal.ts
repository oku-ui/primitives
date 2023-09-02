import type { PropType, Ref } from 'vue'
import { computed, defineComponent, h, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { OkuPortal, type PortalProps } from '@oku-ui/portal'
import { OkuPresence } from '@oku-ui/presence'
import { createPopoverProvide, usePopoverInject } from './popover'
import { type ScopePopover, scopePopoverProps } from './utils'

const PORTAL_NAME = 'OkuPopoverPortal'

export type PortalInjectValue = {
  forceMount?: Ref<true | undefined>
}

export const [portalProvider, usePortalInject] = createPopoverProvide<PortalInjectValue>(PORTAL_NAME, {
  forceMount: undefined,
})

export interface PopoverPortalProps {
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

export const popoverPortalProps = {
  props: {
    container: {
      type: Object as () => PortalProps['container'],
    },
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
  },
  emits: {},
}

const popoverPortal = defineComponent({
  name: PORTAL_NAME,
  inheritAttrs: false,
  props: {
    ...popoverPortalProps.props,
    ...primitiveProps,
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
      present: computed(() => forceMount?.value || inject.open.value).value,
    }, {
      default: () => h(OkuPortal, {
        asChild: true,
        container: container?.value,
      }, slots),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopoverPortal = popoverPortal as typeof popoverPortal &
(new () => {
  $props: ScopePopover<any>
})
