import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type {
  OkuElement,
  PrimitiveProps,

} from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { PropType } from 'vue'
import { Teleport, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'

const PORTAL_NAME = 'OkuPortal'

export type PortalElementNaviteElement = OkuElement<'div'>
export type PortalElement = HTMLDivElement

export interface PortalProps extends PrimitiveProps {
  /**
   * An optional container where the portaled content should be appended.
   */
  container?: HTMLElement | null | string | undefined
}

export const portalProps = {
  props: {
    ...primitiveProps,
    container: {
      type: [Object, String] as PropType<HTMLElement | string | null | undefined>,
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
    const { container, ...portalProps } = toRefs(props)
    const reactivePortalProps = reactive(portalProps)

    const forwardedRef = useForwardRef()

    return () => container.value
      ? h(Teleport,
        { to: container.value, disabled: false },
        h(Primitive.div,
          {
            ...mergeProps(attrs, reactivePortalProps),
            ref: forwardedRef,
          }, {
            default: () => slots.default?.(),
          }),
      )
      : null
  },
})

export const OkuPortal = portal as typeof portal &
(new () => {
  $props: PortalElementNaviteElement
})
