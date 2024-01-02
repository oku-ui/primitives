import { defineComponent, h } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { VISUALLY_HIDDEN_NAME, visuallyHiddenProps } from './props'
import type { VisuallyHiddenNativeElement } from './props'

const visuallyHidden = defineComponent({
  name: VISUALLY_HIDDEN_NAME,
  components: { },
  inheritAttrs: false,
  props: visuallyHiddenProps.props,
  emits: visuallyHiddenProps.emits,
  setup(props, { attrs, slots }) {
    const forwardedRef = useForwardRef()

    return () => h(Primitive.span, {
      ...attrs,
      ref: forwardedRef,
      asChild: props.asChild,
      style: {
        // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
        position: 'absolute',
        border: '0px',
        width: '1px',
        height: '1px',
        padding: '0px',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0px, 0px, 0px, 0px)',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
        ...attrs.style as any,
      },
    }, () => slots.default?.())
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuVisuallyHidden = visuallyHidden as typeof visuallyHidden & (new () => { $props: VisuallyHiddenNativeElement })
