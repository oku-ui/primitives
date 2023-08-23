import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type {
  ComponentPublicInstanceRef,
  ElementType,
  PrimitiveProps,

} from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { Teleport, defineComponent, h, ref, toRefs } from 'vue'

const PORTAL_NAME = 'OkuPortal'

export type PortalElementIntrinsicElement = ElementType<'div'>
export type PortalElement = HTMLDivElement

interface PortalProps extends PrimitiveProps {
  /**
   * An optional container where the portaled content should be appended.
   */
  container?: HTMLElement | null
}

const portal = defineComponent({
  name: PORTAL_NAME,
  inheritAttrs: false,
  props: {
    container: {
      type: Object as () => HTMLElement | null | undefined,
      default: () => globalThis.document.body,
    },
    ...primitiveProps,
  },
  setup(props, { slots, attrs }) {
    const { asChild, container } = toRefs(props)

    const { ...portalAttrs } = attrs

    const portalRef = ref<ComponentPublicInstanceRef<HTMLDivElement> | null>()

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(portalRef, forwardedRef)

    return () => container.value && slots.default
      ? h(Teleport, { to: container.value }, [
        h(
          Primitive.div,
          { ref: composedRefs, asChild: asChild.value, ...portalAttrs },
          {
            default: () => slots.default?.(),
          },
        ),
      ])
      : null
  },
})

export const OkuPortal = portal as typeof portal &
(new () => {
  $props: Partial<PortalElement>
})

export type { PortalProps }
