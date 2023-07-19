import type { Directive } from 'vue'
import { defineComponent, h, ref, toRefs, withDirectives } from 'vue'
import { syncRef } from '@oku-ui/use-composable'
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
  setup(props, { slots, attrs }) {
    const { present } = toRefs(props)
    const elementRef = ref<HTMLElement>()

    const element: Directive = {
      created(el) {
        const { isPresent } = usePresence(present, el)
        syncRef(isPresent, elementRef, { direction: 'ltr' })
      },
    }

    return () => {
      const children = slots.default?.()

      if (children?.length === 1) {
        const [firstChild] = children || []

        const directVNodeChildren = withDirectives(
          h(
            firstChild,
            {
              present: present.value,
              ...attrs,
            },
          ),
          [
            [element],
          ])

        return present.value ? directVNodeChildren : null
      }
      else {
        throw new Error(
          [
            `Now you can only pass one child to \`${NAME}\`.`,
            '',
            'Note: All components accepting `Presence` expect only one direct child of valid VNode type.',
            'You can apply a few solutions:',
            [
              'Provide a single child element so that we can forward the props onto that element.',
              'Ensure the first child is an actual element instead of a raw text node or comment node.',
            ]
              .map(line => `  - ${line}`)
              .join('\n'),
          ].join('\n'),
        )
      }
    }
  },
})

const OkuPresence = presence as typeof presence & (new () => { $props: PresenceProps })

export { OkuPresence }
