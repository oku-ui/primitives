import { type VNode, cloneVNode, defineComponent, shallowRef, warn } from 'vue'
import { usePresence } from './usePresence.ts'
import { getRawChildren } from '../utils/getRawChildren.ts'

export interface PresenceProps {
  present: boolean
}

export const Presence = defineComponent({
  name: 'Presence',
  props: {
    present: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { slots }) {
    const elRef = shallowRef<HTMLElement>()
    // Mount composables once to prevent duplicated eventListener
    const isPresent = usePresence(elRef, () => props.present)

    return () => {
      if (!isPresent)
        return null

      if (!slots.default)
        return null

      const children = slots.default && getRawChildren(slots.default())

      if (!children || !children.length)
        return

      let child: VNode | undefined = children[0]

      if (children.length > 1) {
        let hasFound = false
        // locate first non-comment child
        for (const c of children) {
          if (c.type !== Comment) {
            if (__DEV__ && hasFound) {
              // warn more than one non-comment child
              warn(
                '<Presence> can only be used on a single element or component.',
              )
              break
            }
            child = c
            hasFound = true
            if (!__DEV__)
              break
          }
        }
      }

      if (!child)
        return null

      return cloneVNode(child, { ref: elRef })
    }
  },
})
