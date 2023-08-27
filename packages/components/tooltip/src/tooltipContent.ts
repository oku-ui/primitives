import type { PropType } from 'vue'
import { computed, defineComponent, h } from 'vue'
import type { PrimitiveProps } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuPresence } from '@oku-ui/presence'
import { OkuTooltipContentImpl, tooltipContentImplProps } from './tooltipContentImpl'
import type { TooltipContentImplElement, TooltipContentImplEmits, type TooltipContentImplIntrinsicElement, type TooltipContentImplProps } from './tooltipContentImpl'
import { usePortalInject } from './tooltipPortal'
import type { ScopeTooltip } from './types'
import { scopeTooltipProps } from './types'
import { useTooltipInject } from './tooltip'
import { OkuTooltipContentHoverable } from './tooltipContentHoverable'

export type TooltipContentIntrinsicElement = TooltipContentImplIntrinsicElement
export type TooltipContentElement = TooltipContentImplElement

export interface TooltipContentProps extends PrimitiveProps, TooltipContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export type TooltipContentEmits = TooltipContentImplEmits

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
    const { forceMount, side, scopeOkuTooltip, ...propsa } = props
    const portalInject = usePortalInject(CONTENT_NAME, scopeOkuTooltip)

    const forceMountProps = computed(() => props.forceMount || portalInject.forceMount?.value)
    const sideProps = computed(() => props.side || 'top')

    const forwardedRef = useForwardRef()
    const inject = useTooltipInject(CONTENT_NAME, scopeOkuTooltip)
    return () => h(OkuPresence, {
      present: forceMountProps.value || inject.open.value,
    }, {
      default: () => inject.disableHoverableContent.value
        ? h(OkuTooltipContentImpl, {
          side: sideProps.value,
          ...attrs,
          ...propsa,
          ref: forwardedRef,
        }, {
          default: () => slots.default?.(),
        })
        : h(OkuTooltipContentHoverable, {
          ...attrs,
          ...propsa,
          side: sideProps.value,
          ref: forwardedRef,
        }, {
          default: () => slots.default?.(),
        }),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuTooltipContent = tooltipContent as typeof tooltipContent &
(new () => {
  $props: ScopeTooltip<Partial<TooltipContentElement>>
})
