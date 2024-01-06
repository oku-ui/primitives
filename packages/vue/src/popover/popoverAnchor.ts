import { defineComponent, h, mergeProps, reactive, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuPopperAnchor } from '@oku-ui/popper'

import type { PopoverAnchorNaviteElement } from './props'
import { ANCHOR_NAME, popoverAnchorProps, scopePopoverProps, usePopoverInject, usePopperScope } from './props'

const popoverAnchor = defineComponent({
  name: ANCHOR_NAME,
  inheritAttrs: false,
  props: {
    ...popoverAnchorProps.props,
    ...scopePopoverProps,
  },
  emits: popoverAnchorProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuPopover, ...anchorProps } = toRefs(props)

    const _reactive = reactive(anchorProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = usePopoverInject(ANCHOR_NAME, scopeOkuPopover?.value)
    const popperScope = usePopperScope(scopeOkuPopover?.value)

    watchEffect((onClean) => {
      inject.onCustomAnchorAdd()
      onClean(() => {
        inject.onCustomAnchorRemove()
      })
    })

    return () => h(OkuPopperAnchor, {
      ...popperScope,
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
    }, () => slots.default?.())
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopoverAnchor = popoverAnchor as typeof popoverAnchor & (new () => { $props: PopoverAnchorNaviteElement })
