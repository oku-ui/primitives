import { defineComponent, h, mergeProps, ref, watchEffect } from 'vue'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { type DismissableLayerEmits, OkuDismissableLayer, type DismissableLayerProps as OkuDismissableLayerProps } from '@oku-ui/dismissable-layer'
import { OkuPopperContent, popperContentProps } from '@oku-ui/popper'
import type { PopperContentProps as OkuPopperContentProps, PopperContentElement, PopperContentEmits, PopperContentNaviteElement } from '@oku-ui/popper'
import { OkuSlottable } from '@oku-ui/slot'
import { OkuVisuallyHidden } from '@oku-ui/visually-hidden'
import { TOOLTIP_OPEN, createTooltipProvide, usePopperScope } from './utils'
import { scopeTooltipProps } from './types'
import { TOOLTIP_NAME, useTooltipInject } from './tooltip'

const CONTENT_NAME = 'OkuTooltipContentImpl'

const [visuallyHiddenContentProvider, useVisuallyHiddenContentInject]
  = createTooltipProvide(TOOLTIP_NAME, { isInside: ref(false) })

export {
  useVisuallyHiddenContentInject,
}

export type TooltipContentImplNaviteElement = PopperContentNaviteElement
export type TooltipContentImplElement = PopperContentElement

export type DismissableLayerProps = OkuDismissableLayerProps
export type PopperContentProps = OkuPopperContentProps

export interface TooltipContentImplProps extends PopperContentProps {
  /**
   * A more descriptive label for accessibility purpose
   */
  'ariaLabel'?: string
}

export type TooltipContentImplEmits = Omit<PopperContentEmits, 'placed'> & {
  /**
   * Event handler called when the escape key is down.
   * Can be prevented.
   */
  escapeKeyDown: [event: DismissableLayerEmits['escapeKeyDown'][0]]
  /**
   * Event handler called when the a `pointerdown` event happens outside of the `Tooltip`.
   * Can be prevented.
   */
  pointerdownOutside: [event: DismissableLayerEmits['pointerdownOutside'][0]]
  close: []
}

export const tooltipContentImplProps = {
  props: {
    ...popperContentProps.props,
    ariaLabel: {
      type: String,
      default: undefined,
    },
    ...primitiveProps,
  },
  emits: {
    ...propsOmit(popperContentProps.emits, ['placed']),
    // eslint-disable-next-line unused-imports/no-unused-vars
    escapeKeyDown: (event: DismissableLayerEmits['escapeKeyDown'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdownOutside: (event: DismissableLayerEmits['pointerdownOutside'][0]) => true,
    close: () => true,
  },
}

const tooltipContentImpl = defineComponent({
  name: CONTENT_NAME,
  components: {
    OkuDismissableLayer,
    OkuPopperContent,
    OkuSlottable,
    OkuVisuallyHidden,
  },
  inheritAttrs: false,
  props: {
    ...tooltipContentImplProps.props,
    ...primitiveProps,
    ...scopeTooltipProps,
  },
  emits: tooltipContentImplProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      ariaLabel,
      // eslint-disable-next-line unused-imports/no-unused-vars
      asChild,
      // eslint-disable-next-line unused-imports/no-unused-vars
      scopeOkuTooltip,
      ...contentProps
    } = props
    const { ...restAttrs } = attrs as TooltipContentImplNaviteElement
    const inject = useTooltipInject(CONTENT_NAME, props.scopeOkuTooltip)
    const popperScope = usePopperScope(props.scopeOkuTooltip)
    const forwardedRef = useForwardRef()

    watchEffect((onClean) => {
      document.addEventListener(TOOLTIP_OPEN, inject.onClose)
      onClean(() => {
        document.removeEventListener(TOOLTIP_OPEN, inject.onClose)
      })
    })

    watchEffect((onClean) => {
      if (inject.trigger.value) {
        const handleScroll = (event: Event) => {
          const target = event.target as HTMLElement
          if (target?.contains(inject.trigger.value))
            inject.onClose()
        }
        window.addEventListener('scroll', handleScroll, { capture: true })
        onClean(() => {
          window.removeEventListener('scroll', handleScroll, { capture: true })
        })
      }
    })

    visuallyHiddenContentProvider({
      scope: props.scopeOkuTooltip,
      isInside: ref(false),
    })

    const VisuallyHiddenChild = defineComponent({
      inheritAttrs: false,
      props: {
        scope: { type: null, required: false },
      },
      setup(props, { slots }) {
        visuallyHiddenContentProvider({
          scope: props.scope,
          isInside: ref(true),
        })

        return () => slots.default?.()
      },
    })

    return () => h(OkuDismissableLayer, {
      asChild: true,
      disableOutsidePointerEvents: false,
      onEscapeKeyDown(event) {
        emit('escapeKeyDown', event)
      },
      onPointerdownOutside(event: TooltipContentImplEmits['pointerdownOutside'][0]) {
        emit('pointerdownOutside', event)
      },
      onFocusoutSide(event) {
        event.preventDefault()
      },
      onDismiss() {
        inject.onClose()
      },
    }, {
      default: () => h(OkuPopperContent, {
        'data-state': inject.stateAttribute.value,
        ...popperScope,
        'asChild': props.asChild,
        ...mergeProps(restAttrs, contentProps),
        'ref': forwardedRef,
        'style': {
          ...restAttrs.style as any,
          ...{
            '--oku-tooltip-content-transform-origin': 'var(--oku-popper-transform-origin)',
            '--oku-tooltip-content-available-width': 'var(--oku-popper-available-width)',
            '--oku-tooltip-content-available-height': 'var(--oku-popper-available-height)',
            '--oku-tooltip-trigger-width': 'var(--oku-popper-anchor-width)',
            '--oku-tooltip-trigger-height': 'var(--oku-popper-anchor-height)',
          },
        },
      }, {
        default: () => [
          h(OkuSlottable, {}, slots),
          h(VisuallyHiddenChild, {
            scope: props.scopeOkuTooltip,
          }, {
            default: () => h(OkuVisuallyHidden, {
              id: inject.contentId.value,
              role: 'tooltip',
            }, {
              default: () => ariaLabel || slots.default?.(),
            }),
          }),
        ],
      }),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuTooltipContentImpl = tooltipContentImpl as typeof tooltipContentImpl &
(new () => {
  $props: TooltipContentImplNaviteElement
})
