import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { PrimitiveProps } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuPresence } from '@oku-ui/presence'
import { OkuTooltipContentImpl, tooltipContentImplProps } from './tooltipContentImpl'
import type { TooltipContentImplElement, TooltipContentImplEmits, TooltipContentImplNaviteElement, TooltipContentImplProps } from './tooltipContentImpl'
import { usePortalInject } from './tooltipPortal'
import { scopeTooltipProps } from './types'
import { useTooltipInject } from './tooltip'
import { OkuTooltipContentHoverable } from './tooltipContentHoverable'

export type TooltipContentNaviteElement = TooltipContentImplNaviteElement
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
    const { forceMount: forceMountProps, side: sideProps, scopeOkuTooltip, ...contentProps } = toRefs(props)
    const _reactive = reactive(contentProps)
    const reactiveContentProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const portalInject = usePortalInject(CONTENT_NAME, scopeOkuTooltip.value)
    const forceMount = computed(() => forceMountProps.value || portalInject.forceMount?.value)

    const side = computed(() => sideProps.value || 'top')

    const forwardedRef = useForwardRef()
    const inject = useTooltipInject(CONTENT_NAME, scopeOkuTooltip.value)

    return () => h(OkuPresence, {
      present: computed(() => forceMount.value || inject.open.value).value,
    }, {
      default: () => inject.disableHoverableContent.value
        ? h(OkuTooltipContentImpl, {
          side: side.value,
          ...mergeProps(attrs, reactiveContentProps),
          ref: forwardedRef,
        }, {
          default: () => slots.default?.(),
        })
        : h(OkuTooltipContentHoverable, {
          side: side.value,
          ...mergeProps(attrs, reactiveContentProps),
          ref: forwardedRef,
        }, slots),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuTooltipContent = tooltipContent as typeof tooltipContent &
(new () => {
  $props: TooltipContentNaviteElement
})
