import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type {
  ElementType,
  PrimitiveProps,

} from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { PropType } from 'vue'
import { Teleport, defineComponent, h, toRefs } from 'vue'

const PORTAL_NAME = 'OkuPortal'

export type PortalElementIntrinsicElement = ElementType<'div'>
export type PortalElement = HTMLDivElement

export interface PortalProps extends PrimitiveProps {
  /**
   * An optional container where the portaled content should be appended.
   */
  container?: HTMLElement | null | string
}

export const portalProps = {
  props: {
    ...primitiveProps,
    container: {
      type: [Object, String] as PropType<HTMLElement | string>,
      default: () => globalThis?.document?.body,
    },
  },
  emits: {},
}

const portal = defineComponent({
  name: PORTAL_NAME,
  inheritAttrs: false,
  props: {
    ...portalProps.props,
    ...primitiveProps,
  },
  setup(props, { slots, attrs }) {
    const { asChild, container } = toRefs(props)

    const forwardedRef = useForwardRef()

    return () => container.value
      ? h(Teleport, { to: container.value, disabled: false }, h(Primitive.div,
        {
          ...attrs,
          ref: forwardedRef,
          asChild: asChild.value,
        }, {
          default: () => slots.default?.(),
        }),
      )
      : null
  },
})

export const OkuPortal = portal as typeof portal &
(new () => {
  $props: Partial<PortalElementIntrinsicElement>
})
