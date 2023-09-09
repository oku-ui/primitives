import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { scopePopoverProps } from './utils'
import { usePopoverInject } from './popover'

export type PopoverCloseNaviteElement = OkuElement<'button'>
export type PopoverCloseElement = HTMLButtonElement

export interface PopoverCloseProps extends PrimitiveProps { }

export type PopoverCloseEmits = {
  click: [event: MouseEvent]
}

export const popoverArrowProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: MouseEvent) => true,
  },
}

const CLOSE_NAME = 'OkuPopoverClose'

const popoverClose = defineComponent({
  name: CLOSE_NAME,
  inheritAttrs: false,
  props: {
    ...scopePopoverProps,
  },
  setup(props, { attrs, slots, emit }) {
    const { scopeOkuPopover, ...closeProps } = toRefs(props)
    const reactiveCloseProps = reactive(closeProps)

    const forwardedRef = useForwardRef()
    const inject = usePopoverInject(CLOSE_NAME, scopeOkuPopover?.value)

    return () => h(Primitive.button, {
      type: 'button',
      ...mergeProps(attrs, reactiveCloseProps),
      ref: forwardedRef,
      onClick: composeEventHandlers<PopoverCloseEmits['click'][0]>((event) => {
        emit('click', event)
      }, () => inject.onOpenChange(false)),
    }, {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopoverClose = popoverClose as typeof popoverClose &
(new () => {
  $props: PopoverCloseNaviteElement
})
