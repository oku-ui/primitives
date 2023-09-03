import type { PropType, Ref } from 'vue'
import { computed, defineComponent, h, nextTick, onBeforeUnmount, onMounted, ref, toRef, watch } from 'vue'
import type { ComponentPublicInstanceRef, OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'

import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { useCollapsibleInject } from './collapsible'
import { getState, scopeCollapsibleProps } from './utils'
import { CONTENT_NAME } from './collapsibleContent'

export type CollapsibleContentImplNaviteElement = OkuElement<'div'>
export type CollapsibleContentImplElement = HTMLDivElement

export interface CollapsibleContentImplProps extends PrimitiveProps {
  present: boolean
}

export const collapsibleContentImplProps = {
  props: {
    present: {
      type: Object as unknown as PropType<Ref<boolean>>,
    },
  },
}

const collapsibleContentImpl = defineComponent({
  name: 'OkuCollapsibleContentImpl',
  inheritAttrs: false,
  props: {
    ...collapsibleContentImplProps.props,
    ...scopeCollapsibleProps,
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const present = toRef(props, 'present')
    const { ...contentAttrs } = attrs as CollapsibleContentImplNaviteElement
    const context = useCollapsibleInject(CONTENT_NAME, props.scopeOkuCollapsible)

    const _ref = ref<ComponentPublicInstanceRef<HTMLDivElement> | undefined>(undefined)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(_ref, forwardedRef)

    const heightRef = ref<number | undefined>(0)
    const widthRef = ref<number | undefined>(0)
    const height = computed(() => heightRef.value)
    const width = computed(() => widthRef.value)

    const isPresent = ref(present?.value?.value)
    const isOpen = computed(() => context.open.value || isPresent.value)
    const isMountAnimationPreventedRef = ref(isOpen.value)
    const originalStylesRef = ref<Record<string, string>>()

    const rAf = ref()

    onMounted(() => {
      rAf.value = requestAnimationFrame(() => (isMountAnimationPreventedRef.value = false))
    })

    onBeforeUnmount(() => {
      cancelAnimationFrame(rAf.value)
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
        'data-state': getState(context.open.value),
        'data-disabled': context.disabled?.value ? '' : undefined,
        'id': context.contentId.value,
        'hidden': !isOpen.value,
        ...contentAttrs,
        'ref': composedRefs,
        'asChild': props.asChild,
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
export const OkuCollapsibleContentImpl = collapsibleContentImpl as typeof collapsibleContentImpl &
(new () => {
  $props: CollapsibleContentImplNaviteElement
})
