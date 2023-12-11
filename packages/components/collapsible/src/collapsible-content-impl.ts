import { computed, defineComponent, h, mergeProps, nextTick, reactive, ref, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { getState } from './utils'
import { COLLAPSIBLE_CONTENT_IMPL_NAME, COLLAPSIBLE_CONTENT_NAME, collapsibleContentImplProps, scopeCollapsibleProps, useCollapsibleInject } from './props'
import type { CollapsibleContentImplElement, CollapsibleContentImplNativeElement } from './props'

const collapsibleContentImpl = defineComponent({
  name: COLLAPSIBLE_CONTENT_IMPL_NAME,
  inheritAttrs: false,
  props: {
    ...collapsibleContentImplProps.props,
    ...scopeCollapsibleProps,
  },
  emits: collapsibleContentImplProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuCollapsible, present, ...contentProps } = toRefs(props)

    const _reactive = reactive(contentProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useCollapsibleInject(COLLAPSIBLE_CONTENT_NAME, scopeOkuCollapsible.value)

    const isPresent = ref(present.value)
    const collapsibleContentRef = ref<CollapsibleContentImplElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, collapsibleContentRef)
    const heightRef = ref<number | undefined>(0)
    const height = computed(() => heightRef.value)
    const widthRef = ref<number | undefined>(0)
    const width = computed(() => widthRef.value)
    // when opening we want it to immediately open to retrieve dimensions
    // when closing we delay `present` to retrieve dimensions before closing
    const isOpen = computed(() => inject.open.value || isPresent.value)
    const isMountAnimationPreventedRef = ref(isOpen.value)
    const originalStylesRef = ref<Record<string, string>>()

    // const rAf = ref()

    // onMounted(() => {
    //   rAf.value = requestAnimationFrame(() => (isMountAnimationPreventedRef.value = false))
    // })

    // onBeforeUnmount(() => {
    //   cancelAnimationFrame(rAf.value)
    // })

    watchEffect((onInvalidate) => {
      const rAf = requestAnimationFrame(() => (isMountAnimationPreventedRef.value = false))

      onInvalidate(() => cancelAnimationFrame(rAf))
    })

    watchEffect(async () => {
      const node = collapsibleContentRef.value
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

        await nextTick()

        // kick off any animations/transitions that were originally set up if it isn't the initial mount
        if (!isMountAnimationPreventedRef.value) {
          node.style.transitionDuration = originalStylesRef.value.transitionDuration
          node.style.animationName = originalStylesRef.value.animationName
        }

        isPresent.value = present.value
      }
    })

    return () => h(Primitive.div, {
      'data-state': getState(inject.open.value),
      'data-disabled': inject.disabled?.value ? '' : undefined,
      'id': inject.contentId.value,
      'hidden': !isOpen.value,
      ...mergeProps(attrs, otherProps),
      'ref': composedRefs,
      'style': {
        ['--oku-collapsible-content-height' as any]: height.value ? `${height.value}px` : undefined,
        ['--oku-collapsible-content-width' as any]: width.value ? `${width.value}px` : undefined,
        ...attrs.style as any,
      },
    }, () => isOpen.value && slots.default?.())
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuCollapsibleContentImpl = collapsibleContentImpl as typeof collapsibleContentImpl & (new () => { $props: CollapsibleContentImplNativeElement })
