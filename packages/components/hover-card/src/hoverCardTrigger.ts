import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuPopperAnchor } from '@oku-ui/popper'
import { composeEventHandlers } from '@oku-ui/utils'
import { excludeTouch, scopeHoverCardProps } from './utils'

import { useHoverCardInject, usePopperScope } from './hoverCard'

const HOVERCARD_TRIGGER_NAME = 'OkuHoverCardTrigger'

export type HoverCardTriggerNativeElement = OkuElement<'a'>
export type HoverCardTriggerElement = HTMLAnchorElement

export interface HoverCardTriggerProps { }

export const hoverCardTriggerProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerenter: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerleave: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    focus: (event: FocusEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    blur: (event: FocusEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: MouseEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    touchstart: (event: MouseEvent) => true,
  },
}

const hoverCardTrigger = defineComponent({
  name: HOVERCARD_TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    ...hoverCardTriggerProps.props,
    ...scopeHoverCardProps,
  },
  emits: hoverCardTriggerProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { scopeOkuHoverCard, ...triggerProps } = toRefs(props)

    const _reactive = reactive(triggerProps)
    const reactiveTriggerProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = useHoverCardInject(HOVERCARD_TRIGGER_NAME, scopeOkuHoverCard.value)
    const popperScope = usePopperScope(scopeOkuHoverCard.value)

    const forwardedRef = useForwardRef()

    return () => h(OkuPopperAnchor, {
      asChild: true,
      ...popperScope,
    }, {
      default: () => h(Primitive.a, {
        'data-state': inject.open.value ? 'open' : 'closed',
        ...mergeProps(attrs, reactiveTriggerProps),
        'ref': forwardedRef,
        'onPointerenter': composeEventHandlers<PointerEvent>((el) => {
          emit('pointerenter', el)
        }, excludeTouch(inject.onOpen)),
        'onPointerleave': composeEventHandlers<PointerEvent>((el) => {
          emit('pointerleave', el)
        }, excludeTouch(inject.onClose)),
        'onFocus': composeEventHandlers<FocusEvent>((el) => {
          emit('focus', el)
        }, inject.onOpen),
        'onBlur': composeEventHandlers<FocusEvent>((el) => {
          emit('blur', el)
        }, inject.onClose),
        'onTouchStart': composeEventHandlers<MouseEvent>((el) => {
          emit('touchstart', el)
        }, (event) => {
          event.preventDefault()
        }),

      }, {
        default: () => slots.default?.(),
      }),
    })
  },
})

export const OkuHoverCardTrigger = hoverCardTrigger as typeof hoverCardTrigger &
(new () => {
  $props: HoverCardTriggerNativeElement
})
