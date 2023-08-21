import { defineComponent, h, toRefs } from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { usePresence } from './usePresence'

interface PresenceProps {
  present: boolean
}

const presenceProps = {
  present: Boolean,
}

const NAME = 'OkuPresence'

const presence = defineComponent({
  name: NAME,
  inheritAttrs: true,
  props: {
    ...presenceProps,
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
      const [child] = slot ?? []

      return isPresent.value
        ? h(child, {
          ref: composedRefs,
        })
        : null
    }
  },
})

const OkuPresence = presence as typeof presence & (new () => { $props: PresenceProps })

export { OkuPresence }
