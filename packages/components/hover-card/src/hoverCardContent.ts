import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, toRefs } from 'vue'
import type { PrimitiveProps } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuPresence } from '@oku-ui/presence'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuHoverCardContentImpl, hoverCardContentImplProps } from './hoverCardContentImpl'
import type { HoverCardContentImplElement, HoverCardContentImplEmits, HoverCardContentImplNaviteElement, HoverCardContentImplProps } from './hoverCardContentImpl'
import { usePortalInject } from './hoverCardPortal'
import { useHoverCardInject } from './hoverCard'
import { excludeTouch, scopeHoverCardProps } from './utils'

export const CONTENT_NAME = 'OkuHoverCardContent'

export type HoverCardContentNaviteElement = HoverCardContentImplNaviteElement
export type HoverCardContentElement = HoverCardContentImplElement

export interface HoverCardContentProps extends PrimitiveProps, HoverCardContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export type HoverCardContentEmits = HoverCardContentImplEmits

export const hoverCardContentProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
    ...hoverCardContentImplProps.props,
  },
  emits: {
    ...hoverCardContentImplProps.emits,
  },
}

const hoverCardContent = defineComponent({
  name: CONTENT_NAME,
  inheritAttrs: false,
  props: {
    ...hoverCardContentProps.props,
    ...primitiveProps,
    ...scopeHoverCardProps,
  },
  emits: hoverCardContentImplProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { forceMount, side, scopeOkuHoverCard } = toRefs(props)
    const portalInject = usePortalInject(CONTENT_NAME, scopeOkuHoverCard.value)
    const forceMountProps = computed(() => forceMount.value || portalInject.forceMount?.value)
    const forwardedRef = useForwardRef()
    const inject = useHoverCardInject(CONTENT_NAME, scopeOkuHoverCard.value)

    return () => h(OkuPresence, {
      present: computed(() => forceMountProps.value || inject.open.value).value,
    }, {
      default: () => h(OkuHoverCardContentImpl, {
        'data-state': inject.open.value ? 'open' : 'closed',
        ...mergeProps(attrs, props),
        'onPointerenter': composeEventHandlers<PointerEvent>((el) => {
          emit('pointerenter', el)
        }, excludeTouch(inject.onOpen)),
        'onPointerleave': composeEventHandlers<PointerEvent>((el) => {
          emit('pointerleave', el)
        }, excludeTouch(inject.onClose)),
        'ref': forwardedRef,
      }, {
        default: () => slots.default?.(),
      }),
    })
  },
})

export const OkuHoverCardContent = hoverCardContent as typeof hoverCardContent &
(new () => {
  $props: HoverCardContentNaviteElement
})
