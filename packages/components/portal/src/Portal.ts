import type {
  ElementType,
  IPrimitiveProps,
  InstanceTypeRef,
  MergeProps,
} from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { Teleport, defineComponent, h, toRefs } from 'vue'

const PORTAL_NAME = 'OkuPortal'

type PortalElement = ElementType<'div'>
export type _PortalEl = HTMLDivElement

interface PortalProps extends IPrimitiveProps {
  /**
   * An optional container where the portaled content should be appended.
   */
  container?: HTMLElement | null
}

const Portal = defineComponent({
  name: PORTAL_NAME,
  inheritAttrs: false,
  props: {
    container: {
      type: Object as () => HTMLElement | null,
      default: () => globalThis?.document?.body,
    },
    asChild: {
      type: Boolean,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    const { asChild, container } = toRefs(props)

    const { ...portalAttrs } = attrs

    const portalRef = useForwardRef()

    const originalReturn = () => {
      if (!container.value || !slots.default)
        return null

      return h(Teleport, { to: container.value }, () =>
        h(
          Primitive.div,
          { ref: portalRef, asChild: asChild.value, ...portalAttrs },
          slots.default && slots.default(),
        ),
      )
    }

    return originalReturn
  },
})

type _Portal = MergeProps<PortalProps, PortalElement>
type InnerPortal = InstanceTypeRef<typeof Portal, _PortalEl>

const OkuPortal = Portal as typeof Portal & (new () => { $props: _Portal })

export { OkuPortal }

export { InnerPortal, PortalProps, _Portal }
