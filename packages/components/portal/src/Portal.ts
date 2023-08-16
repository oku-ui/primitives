import { Primitive, PrimitiveProps } from '@oku-ui/primitive'
import type {
  ComponentPublicInstanceRef,
  ElementType,
  IPrimitiveProps,
  MergeProps,
} from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, onMounted, ref, render, toRefs } from 'vue'

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
      type: Object as () => HTMLElement | null | undefined,
      default: null,
    },
    ...PrimitiveProps,
  },
  setup(props, { slots, attrs }) {
    const { asChild, container } = toRefs(props)

    const { ...portalAttrs } = attrs

    const portalRef = ref<ComponentPublicInstanceRef<HTMLDivElement> | null>()

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(portalRef, forwardedRef)

    const containerRef = ref<HTMLElement | null>(null)

    onMounted(() => {
      containerRef.value = container.value || globalThis.document.body
    })

    return () => {
      if (containerRef.value && slots.default) {
        const content = h(
          Primitive.div,
          { ref: composedRefs, asChild: asChild.value, ...portalAttrs },
          slots.default(),
        )

        const divElement = document.createElement('div')

        render(content, divElement)

        containerRef.value.appendChild(divElement)
      }

      return null
    }
  },
})

type _Portal = MergeProps<PortalProps, PortalElement>

const OkuPortal = Portal as typeof Portal & (new () => { $props: _Portal })

export { OkuPortal }

export type { PortalProps }
