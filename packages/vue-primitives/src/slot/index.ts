import { Comment, type VNode, defineComponent, shallowRef, warn } from 'vue'
import { getRawChildren } from '../utils/getRawChildren.ts'
import { ELEMENT_NODE } from '../primitive/Primitive.ts'

export const Slot = defineComponent({
  name: 'Slot',
  setup(_, { slots, expose }) {
    const elRef = shallowRef<HTMLElement>()

    function setElRef(el: any) {
      const node = (el?.$el ?? el)
      const elNode = node && node.nodeType === ELEMENT_NODE ? node : undefined
      if (elNode === elRef)
        return
      elRef.value = elNode
    }

    expose({
      $el: elRef,
    })

    return () => {
      if (!slots.default)
        return null

      const children = slots.default && getRawChildren(slots.default(), undefined, undefined, setElRef)

      if (!children || !children.length)
        return null

      let child: VNode | undefined = children[0]

      if (children.length > 1) {
        let hasFound = false
        // locate first non-comment child
        for (const c of children) {
          if (c.type !== Comment) {
            if (__DEV__ && hasFound) {
              // warn more than one non-comment child
              warn(
                '<Slot> can only be used on a single element or component.',
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

      if (child && child.type !== Comment)
        return child

      return null
    }
  },
})
