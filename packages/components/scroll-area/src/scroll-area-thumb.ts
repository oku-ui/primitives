import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { primitiveProps } from '@oku-ui/primitive'
import { OkuPresence } from '@oku-ui/presence'
import { OkuScrollAreaThumbImpl } from './scroll-area-thumb-impl'
import { SCROLL_AREA_THUMB_NAME, scopedScrollAreaProps, scrollAreaThumbProps, useScrollbarInject } from './props'
import type { ScrollAreaThumbNaviteElement } from './props'

const scrollAreaThumb = defineComponent({
  name: SCROLL_AREA_THUMB_NAME,
  components: {
    OkuPresence,
    OkuScrollAreaThumbImpl,
  },
  inheritAttrs: false,
  props: {
    ...scrollAreaThumbProps.props,
    ...scopedScrollAreaProps,
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const {
      forceMount,
      ...scrollAreaThumbProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaThumbProps)
    const reactiveScrollAreaThumbProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const scrollbarInject = useScrollbarInject(SCROLL_AREA_THUMB_NAME, props.scopeOkuScrollArea)

    return () => h(OkuPresence, { present: computed(() => forceMount.value || scrollbarInject.hasThumb.value).value }, {
      default: () => h(OkuScrollAreaThumbImpl, {
        ref: forwardedRef,
        ...mergeProps(attrs, reactiveScrollAreaThumbProps),
      }, slots),
    })
  },
})

export const OkuScrollAreaThumb = scrollAreaThumb as typeof scrollAreaThumb &
(new () => { $props: ScrollAreaThumbNaviteElement })
