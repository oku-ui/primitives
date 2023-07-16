import type { PropType } from 'vue'
import { computed, defineComponent, h, ref, toRefs } from 'vue'
import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { Primitive } from '@oku-ui/primitive'

import { useRef } from '@oku-ui/use-composable'
import { useCollapsibleInject } from './collapsible'
import { getState } from './utils'
import { CONTENT_NAME } from './collapsibleContent'

type CollapsibleContentImplElement = ElementType<'div'>
interface CollapsibleContentImplProps extends PrimitiveProps { }

const CollapsibleContentImpl = defineComponent({
  inheritAttrs: false,
  props: {
    present: {
      type: Boolean,
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
    const { scopeCollapsible, present, asChild } = toRefs(props)
    const { ...contentProps } = attrs as CollapsibleContentImplElement
    const context = useCollapsibleInject(CONTENT_NAME, scopeCollapsible.value)
    const { $el, newRef } = useRef()

    expose({
      innerRef: $el,
    })
    const isPresent = ref(present.value)
    const isOpen = computed(() => context.value.open.value || isPresent.value)

    const originalReturn = () => h(
      Primitive.div,
      {
        'data-state': getState(context.value.open.value),
        'data-disabled': context.value.disabled?.value ? '' : undefined,
        'id': context.value.contentId,
        'hidden': !isOpen.value,
        ...contentProps,
        'ref': newRef,
        'asChild': asChild.value,
        'style': {
          // ...attrs.style,
        },
      },
      isOpen.value
        ? {
            default: () => slots.default && slots.default(),
          }
        : undefined,
    )

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _CollapsibleContentImplProps = MergeProps<CollapsibleContentImplProps, CollapsibleContentImplElement>
type CollapsibleContentImplRef = RefElement<typeof CollapsibleContentImpl>

const OkuCollapsibleContentImpl = CollapsibleContentImpl as typeof CollapsibleContentImpl & (new () => { $props: _CollapsibleContentImplProps })

export { OkuCollapsibleContentImpl }
export type { CollapsibleContentImplProps, CollapsibleContentImplElement, CollapsibleContentImplRef }
