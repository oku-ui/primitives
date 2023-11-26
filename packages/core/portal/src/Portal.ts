import { Teleport, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { PropType } from 'vue'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'

const PORTAL_NAME = 'OkuPortal'

export type PortalElementNaviteElement = OkuElement<'div'>
export type PortalElement = HTMLDivElement

export interface PortalProps extends PrimitiveProps {
  /**
   * An optional container where the portaled content should be appended.
   */
  container?: HTMLElement | null
}

export const portalProps = {
  props: {
    container: {
      type: Object as PropType<PortalProps['container']>,
      default: globalThis?.document?.body,
    },
    ...primitiveProps,
  },
  emits: {},
}
const portal = defineComponent({
  name: PORTAL_NAME,
  inheritAttrs: false,
  props: {
    ...portalProps.props,
  },
  emits: portalProps.emits,
  setup(props, { slots, attrs }) {
    const { container, ...restProps } = toRefs(props)

    const _reactive = reactive(restProps)
    const reactivePortalProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    return () => container.value
      ? h(Teleport, {
        to: container.value,
        disabled: !container.value,
      }, [
        h(Primitive.div, {
          ...mergeProps(attrs, reactivePortalProps),
          ref: forwardedRef,
        }, slots.default?.()),
      ])
      : null
  },
})

export const OkuPortal = portal as typeof portal &
  (new () => { $props: PortalElementNaviteElement })
