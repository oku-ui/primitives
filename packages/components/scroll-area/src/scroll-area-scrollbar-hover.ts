import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuPresence } from '@oku-ui/presence'

import type { ScrollAreaScrollbarHoverNaviteElement } from './props'
import { SCROLL_AREA_SCROLLBAR_HOVER, SCROLL_AREA_SCROLLBAR_NAME, scopedScrollAreaProps, scrollAreaScrollbarHoverProps, useScrollAreaInject } from './props'
import { OkuScrollAreaScrollbarAuto } from './scroll-area-scrollbar-auto'

const scrollAreaScrollbarHover = defineComponent({
  name: SCROLL_AREA_SCROLLBAR_HOVER,
  components: {
    OkuPresence,
    OkuScrollAreaScrollbarAuto,
  },
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarHoverProps.props,
    ...scopedScrollAreaProps,
  },
  setup(props, { attrs, slots }) {
    const {
      forceMount,
      ...scrollAreaScrollbarHoverProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaScrollbarHoverProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useScrollAreaInject(SCROLL_AREA_SCROLLBAR_NAME, props.scopeOkuScrollArea)
    const visible = ref(false)

    watchEffect((onInvalidate) => {
      const scrollArea = inject.scrollArea.value
      let hideTimer = 0

      if (scrollArea) {
        const handlePointerEnter = () => {
          window.clearTimeout(hideTimer)
          visible.value = true
        }

        const handlePointerLeave = () => {
          hideTimer = window.setTimeout(() => visible.value = false, inject.scrollHideDelay.value)
        }

        scrollArea.addEventListener('pointerenter', handlePointerEnter)
        scrollArea.addEventListener('pointerleave', handlePointerLeave)

        onInvalidate(() => {
          window.clearTimeout(hideTimer)
          scrollArea.removeEventListener('pointerenter', handlePointerEnter)
          scrollArea.removeEventListener('pointerleave', handlePointerLeave)
        })
      }
    })

    return () => h(OkuPresence, { present: computed(() => forceMount.value || visible.value).value }, () => h(OkuScrollAreaScrollbarAuto, {
      'data-state': visible.value ? 'visible' : 'hidden',
      ...mergeProps(attrs, otherProps),
      'ref': forwardedRef,
    }, () => slots.default?.()))
  },
})

export const OkuScrollAreaScrollbarHover = scrollAreaScrollbarHover as typeof scrollAreaScrollbarHover & (new () => { $props: ScrollAreaScrollbarHoverNaviteElement })
