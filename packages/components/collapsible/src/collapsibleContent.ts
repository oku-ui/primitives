import type { PropType } from 'vue'
import { Transition, defineComponent, h, toRefs } from 'vue'
import type { Scope } from '@oku-ui/provide'

import { useRef } from '@oku-ui/use-composable'
import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import { OkuPresence } from '@oku-ui/presence'
import { OkuCollapsibleContentImpl } from './collapsibleContentImpl'
import { useCollapsibleInject } from './collapsible'

export const CONTENT_NAME = 'CollapsibleContent'

type CollapsibleContentElement = ElementType<'div'>
interface CollapsibleContentProps extends PrimitiveProps {
}

const CollapsibleContent = defineComponent({
  name: CONTENT_NAME,
  components: {
    OkuCollapsibleContentImpl,
    Transition,
  },
  inheritAttrs: false,
  props: {
    /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
    forceMount: {
      type: Boolean,
      default: true,
    },
    scopeCollapsible: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
    asChild: {
      type: Boolean,
      default: undefined,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { scopeCollapsible } = toRefs(props)
    const { ...contentProps } = attrs as CollapsibleContentElement

    const context = useCollapsibleInject(CONTENT_NAME, scopeCollapsible.value)

    const { $el, newRef } = useRef<CollapsibleContentElement>()

    expose({
      innerRef: $el,
    })

    // TODO: Transition
    const originalReturn = () => h(
      OkuPresence,
      {
        present: props.forceMount || context.value.open.value,
      },
      {
        default: () => h(
          OkuCollapsibleContentImpl,
          {
            ...contentProps,
            ref: newRef,
            asChild: props.asChild,
            scopeCollapsible: scopeCollapsible.value,
          },
          {
            default: () => slots.default && slots.default(),
          },
        ),
      },
    )

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _CollapsibleContentProps = MergeProps<CollapsibleContentProps, CollapsibleContentElement>
type CollapsibleContentRef = RefElement<typeof CollapsibleContent>

const OkuCollapsibleContent = CollapsibleContent as typeof CollapsibleContent & (new () => { $props: _CollapsibleContentProps })

export { OkuCollapsibleContent }
export type { CollapsibleContentProps, CollapsibleContentElement, CollapsibleContentRef }
