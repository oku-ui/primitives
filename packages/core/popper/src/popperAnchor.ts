import { defineComponent, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import type { PopperAnchorNaviteElement } from './props'
import { ANCHOR_NAME, popperAnchorProps, scopePopperProps, usePopperInject } from './props'

const popperAnchor = defineComponent({
  name: ANCHOR_NAME,
  inheritAttrs: false,
  props: {
    ...popperAnchorProps.props,
    ...scopePopperProps,
  },
  setup(props, { attrs, slots }) {
    const { virtualRef, scopeOkuPopper, ...anchorProps } = toRefs(props)
    const _reactive = reactive(anchorProps)
    const reactiveAnchorProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = usePopperInject(ANCHOR_NAME, scopeOkuPopper.value)

    const _ref = ref<HTMLDivElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, _ref)

    watchEffect(() => {
      // Consumer can anchor the popper to something that isn't
      // a DOM node e.g. pointer position, so we override the
      // `anchorRef` with their virtual ref in this case.
      inject.onAnchorChange(virtualRef?.value || _ref.value)
    })

    return () =>
      virtualRef.value
        ? null
        : h(
          Primitive.div,
          {
            ...mergeProps(reactiveAnchorProps, attrs),
            ref: composedRefs,
          }, slots)
  },
})

export const OkuPopperAnchor = popperAnchor as typeof popperAnchor &
(new () => {
  $props: PopperAnchorNaviteElement
})
