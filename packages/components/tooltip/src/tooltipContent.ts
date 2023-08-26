import type { PropType } from 'vue'
import { defineComponent, h, toRefs, unref } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuPresence } from '@oku-ui/presence'
import { OkuTooltipContentImpl, type TooltipContentImplElement, type TooltipContentImplIntrinsicElement, type TooltipContentImplProps, tooltipContentImplProps } from './tooltipContentImpl'
import { usePortalInject } from './tooltipPortal'
import type { ScopeTooltip } from './types'
import { scopeTooltipProps } from './types'
import { useTooltipInject } from './tooltip'
import { OkuTooltipContentHoverable } from './tooltipContentHoverable'

export type TooltipContentIntrinsicElement = TooltipContentImplIntrinsicElement
export type TooltipContentElement = TooltipContentImplElement

export interface TooltipContentProps extends TooltipContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export const tooltipContentProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
    ...tooltipContentImplProps.props,
  },
  emits: {
    ...tooltipContentImplProps.emits,
  },
}

export const CONTENT_NAME = 'OkuTooltipContent'

const tooltipContent = defineComponent({
  name: CONTENT_NAME,
  inheritAttrs: false,
  props: {
    ...tooltipContentProps.props,
    ...primitiveProps,
    ...scopeTooltipProps,
  },
  emits: tooltipContentImplProps.emits,
  setup(props, { attrs, slots }) {
    const portalInject = usePortalInject(CONTENT_NAME, props.scopeOkuTooltip)
    const {
      forceMount = portalInject.forceMount,
      side = 'top',
      asChild,
      ...contentProps
    } = toRefs(props)
    const forwardedRef = useForwardRef()
    const inject = useTooltipInject(CONTENT_NAME, props.scopeOkuTooltip)
    return () => h(OkuPresence, {
      present: unref(forceMount) || inject.open.value,
    }, {
      default: () => inject.disableHoverableContent.value
        ? h(OkuTooltipContentImpl, {
          side: unref(side),
          // TODO: contentProps
          ref: forwardedRef,
        }, slots)
        : h(OkuTooltipContentHoverable, {
          side: unref(side),
          ref: forwardedRef,
        }, slots),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuTooltipContent = tooltipContent as typeof tooltipContent &
(new () => {
  $props: ScopeTooltip<Partial<TooltipContentElement>>
})
