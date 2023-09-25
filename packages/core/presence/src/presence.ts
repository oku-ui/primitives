import type { ComputedRef } from 'vue'
import { cloneVNode, defineComponent, toRefs } from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { usePresence } from './usePresence'

export interface PresenceProps {
  present: boolean
}

const presenceProps = {
  props: {
    present: Boolean,
  },
}

export type isPresent = ComputedRef<boolean>

const NAME = 'OkuPresence'

const presence = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...presenceProps.props,
  },
  setup(props, { slots }) {
    const { present } = toRefs(props)
    const forwardedRef = useForwardRef()
    const { isPresent, ref: presenceRef } = usePresence(present)
    const composedRefs = useComposedRefs(presenceRef, forwardedRef)

    return () => {
      const slot = slots.default?.({
        isPresent,
      })

      if (slot && slot?.length > 1)
        console.error(`OkuPresence can only contain a single child, but found ${slot.length} children. Please use a single wrapper element.`)

      const [child] = slot ?? []
      return isPresent.value
        ? cloneVNode(child, {
          ref: composedRefs,
        }, true)
        : null
    }
  },
})

export const OkuPresence = presence
