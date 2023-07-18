import { cloneVNode, defineComponent, toRefs, withDirectives } from 'vue'
import { usePresence } from './usePresence'

interface PresenceProps {
  present: boolean
}

const NAME = 'OkuPresence'

const presence = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    present: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { present } = toRefs(props)

    const { isPresent, ref } = usePresence(present)

    return () => {
      const children = slots.default?.()

      const [firstChild] = children || []
      const clone = cloneVNode(firstChild, { present: isPresent.value, ...attrs })

      const render = withDirectives(clone, [])
      return isPresent.value ? render : null
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete

const OkuPresence = presence as typeof presence & (new () => { $props: PresenceProps })

export { OkuPresence }
