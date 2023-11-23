import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { ASPECT_RATIO_NAME, aspectRatioProps } from './props'
import type { AspectRatioNativeElement } from './props'

const aspectRatio = defineComponent({
  name: ASPECT_RATIO_NAME,
  inheritAttrs: false,
  props: {
    ...aspectRatioProps.props,
  },
  emit: {
    ...aspectRatioProps.emits,
  },
  setup(props, { attrs, slots }) {
    const {
      ratio,
      ...aspectRatioProps
    } = toRefs(props)

    const _reactive = reactive(aspectRatioProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    return () => h('div', {
      'style': {
        // ensures inner element is contained
        position: 'relative',
        // ensures padding bottom trick maths works
        paddingBottom: `${100 / ratio.value}%`,
      },
      'data-oku-aspect-ratio-wrapper': '',
    }, [
      h(Primitive.div, {
        ...mergeProps(attrs, otherProps, emits),
        ref: forwardedRef,
        style: {
          ...attrs.style as any,
          // ensures children expand in ratio
          position: 'absolute',
          top: '0px',
          right: '0px',
          left: '0px',
          bottom: '0px',
        },
      }, slots),
    ])
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAspectRatio = aspectRatio as typeof aspectRatio &
(new () => { $props: AspectRatioNativeElement })
