import type { PropType, Ref } from 'vue'
import { computed, defineComponent, h, nextTick, onMounted, ref, toRefs, watch, watchEffect } from 'vue'
import type { ComponentPublicInstanceRef, ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'

import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { useCollapsibleInject } from './collapsible'
import type { ScopeCollapsible } from './utils'
import { getState, scopeCollapsibleProps } from './utils'
import { CONTENT_NAME } from './collapsibleContent'

export type CollapsibleContentImplIntrinsicElement = ElementType<'div'>
export type CollapsibleContentImplElement = HTMLDivElement

interface CollapsibleContentImplProps extends PrimitiveProps {
  present: boolean
}

const collapsibleContentImplProps = {
  present: {
    type: Object as unknown as PropType<Ref<boolean>>,
  },
}

const collapsibleContentImpl = defineComponent({
  name: 'OkuCollapsibleContentImpl',
  inheritAttrs: false,
  props: {
    ...collapsibleContentImplProps,
    ...scopeCollapsibleProps,
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const { present, asChild } = toRefs(props)
    const { ...contentAttrs } = attrs as CollapsibleContentImplIntrinsicElement
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
        'data-state': getState(context.open.value),
        'data-disabled': context.disabled?.value ? '' : undefined,
        'id': context.contentId.value,
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
export const OkuCollapsibleContentImpl = collapsibleContentImpl as typeof collapsibleContentImpl &
(new () => {
  $props: ScopeCollapsible<Partial<CollapsibleContentImplElement>>
})

export type { CollapsibleContentImplProps }
