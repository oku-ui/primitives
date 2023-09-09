import { defineComponent, h, mergeProps, reactive, toRefs, watchEffect } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuPopperAnchor, popperAnchorProps } from '@oku-ui/popper'
import type { PopperAnchorElement, PopperAnchorNaviteElement, PopperAnchorProps } from '@oku-ui/popper'
import { scopePopoverProps } from './utils'
import { usePopoverInject, usePopperScope } from './popover'

export type PopoverAnchorNaviteElement = PopperAnchorNaviteElement
export type PopoverAnchorElement = PopperAnchorElement

export interface PopoverAnchorProps extends PopperAnchorProps { }

export const popoverAnchorProps = {
  props: {
    ...popperAnchorProps.props,
  },
  emits: {
    ...popperAnchorProps.emits,
  },
}

const ANCHOR_NAME = 'OkuPopoverAnchor'

const popoverAnchor = defineComponent({
  name: ANCHOR_NAME,
  inheritAttrs: false,
  props: {
    ...popoverAnchorProps.props,
    ...primitiveProps,
    ...scopePopoverProps,
  },
  emits: popoverAnchorProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuPopover, ...anchorProps } = toRefs(props)
    const reactiveAnchorProps = reactive(anchorProps)

    const inject = usePopoverInject(ANCHOR_NAME, scopeOkuPopover?.value)

    const popperScope = usePopperScope(scopeOkuPopover?.value)
    const forwardedRef = useForwardRef()

    watchEffect((onClean) => {
      inject.onCustomAnchorAdd()
      onClean(() => {
        inject.onCustomAnchorRemove()
      })
    })

    return () => h(OkuPopperAnchor, {
      ...popperScope,
      ...mergeProps(attrs, reactiveAnchorProps),
      ref: forwardedRef,
    }, {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopoverAnchor = popoverAnchor as typeof popoverAnchor &
(new () => {
  $props: PopoverAnchorNaviteElement
})
