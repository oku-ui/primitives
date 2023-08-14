import type { PropType, Ref } from 'vue'
import { computed, defineComponent, h, nextTick, onMounted, ref, toRefs, watch, watchEffect } from 'vue'
import type { ComponentPublicInstanceRef, ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { Primitive } from '@oku-ui/primitive'

import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { useCollapsibleInject } from './collapsible'
import { getState } from './utils'
import { CONTENT_NAME } from './collapsibleContent'

type CollapsibleContentImplElement = ElementType<'div'>
export type _CollapsibleContentImplEl = HTMLDivElement

interface CollapsibleContentImplProps extends IPrimitiveProps { }

const CollapsibleContentImpl = defineComponent({
  inheritAttrs: false,
  props: {
    present: {
      type: Object as unknown as PropType<Ref<boolean>>,
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
  setup(props, { attrs, slots }) {
    const { scopeCollapsible, present, asChild } = toRefs(props)
    const { ...contentAttrs } = attrs as CollapsibleContentImplElement
    const context = useCollapsibleInject(CONTENT_NAME, scopeCollapsible.value)

    const _ref = ref<ComponentPublicInstanceRef<HTMLDivElement> | undefined>(undefined)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(_ref, forwardedRef)

    const heightRef = ref<number | undefined>(0)
    const widthRef = ref<number | undefined>(0)
    const height = computed(() => heightRef.value)
    const width = computed(() => widthRef.value)

    const isPresent = ref(present?.value?.value)
    const isOpen = computed(() => context.value.open.value || isPresent.value)
    const isMountAnimationPreventedRef = ref(isOpen.value)
    const originalStylesRef = ref<Record<string, string>>()

    onMounted(() => {
      watchEffect(async (onCleanup) => {
        const rAF = requestAnimationFrame(() => (isMountAnimationPreventedRef.value = false))
        onCleanup(() => cancelAnimationFrame(rAF))
      })
    })

    watch([isOpen, isPresent], async () => {
      await nextTick()
      const node = _ref.value?.$el
      if (node) {
        originalStylesRef.value = originalStylesRef.value || {
          transitionDuration: node.style.transitionDuration,
          animationName: node.style.animationName,
        }
        // block any animations/transitions so the element renders at its full dimensions
        node.style.transitionDuration = '0s'
        node.style.animationName = 'none'

        // get width and height from full dimensions
        const rect = node.getBoundingClientRect()
        heightRef.value = rect.height
        widthRef.value = rect.width

        // kick off any animations/transitions that were originally set up if it isn't the initial mount
        if (!isMountAnimationPreventedRef.value) {
          node.style.transitionDuration = originalStylesRef.value.transitionDuration
          node.style.animationName = originalStylesRef.value.animationName
        }

        isPresent.value = present?.value?.value
      }
    })

    const originalReturn = () => h(
      Primitive.div,
      {
        'data-state': getState(context.value.open.value),
        'data-disabled': context.value.disabled?.value ? '' : undefined,
        'id': context.value.contentId,
        'hidden': !isOpen.value,
        ...contentAttrs,
        'ref': composedRefs,
        'asChild': asChild.value,
        'style': {
          ['--oku-collapsible-content-height' as any]: height.value ? `${height.value}px` : undefined,
          ['--oku-collapsible-content-width' as any]: width.value ? `${width.value}px` : undefined,
          ...contentAttrs.style as any,
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
type InstanceCollapsibleContentImplType = InstanceTypeRef<typeof CollapsibleContentImpl, _CollapsibleContentImplEl>

const OkuCollapsibleContentImpl = CollapsibleContentImpl as typeof CollapsibleContentImpl & (new () => { $props: _CollapsibleContentImplProps })

export { OkuCollapsibleContentImpl }
export type { CollapsibleContentImplProps, CollapsibleContentImplElement, InstanceCollapsibleContentImplType }
