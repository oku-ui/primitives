import type { PropType } from 'vue'
import { Transition, defineComponent, h, toRefs } from 'vue'
import type { Scope } from '@oku-ui/provide'

import { useRef } from '@oku-ui/use-composable'
import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import { OkuCollapsibleContentImpl } from './collapsibleContentImpl'

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

    const { $el, newRef } = useRef<CollapsibleContentElement>()

    expose({
      innerRef: $el,
    })

    // TODO: Transition
    const originalReturn = () => h(
      Transition,
      {},
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
