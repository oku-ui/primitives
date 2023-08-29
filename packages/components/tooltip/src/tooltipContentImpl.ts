import { defineComponent, h, watchEffect } from 'vue'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { type DismissableLayerEmits, OkuDismissableLayer, type DismissableLayerProps as OkuDismissableLayerProps } from '@oku-ui/dismissable-layer'
import { OkuPopperContent, popperContentProps } from '@oku-ui/popper'
import type { PopperContentProps as OkuPopperContentProps, PopperContentElement, PopperContentEmits, PopperContentIntrinsicElement } from '@oku-ui/popper'
import { OkuSlottable } from '@oku-ui/slot'
import { OkuVisuallyHidden } from '@oku-ui/visually-hidden'
import { TOOLTIP_OPEN, createTooltipProvide, usePopperScope } from './utils'
import { type ScopeTooltip, scopeTooltipProps } from './types'
import { useTooltipInject } from './tooltip'

const CONTENT_NAME = 'OkuTooltipContentImpl'

const [visuallyHiddenContentProvider, useVisuallyHiddenContentInject]
  = createTooltipProvide(CONTENT_NAME, { isInside: false })

export {
  useVisuallyHiddenContentInject,
}

export type TooltipContentImplIntrinsicElement = PopperContentIntrinsicElement
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
  escapeKeyDown: [event: DismissableLayerEmits['escapeKeyDown']]
  /**
   * Event handler called when the a `pointerdown` event happens outside of the `Tooltip`.
   * Can be prevented.
   */
  pointerdownOutside: [event: DismissableLayerEmits['pointerdownOutside']]
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
    escapeKeyDown: (event: KeyboardEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdownOutside: (event: PointerEvent) => true,
    close: () => true,
  },
}

const tooltipContentImpl = defineComponent({
  name: CONTENT_NAME,
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
      asChild,
      scopeOkuTooltip,
      ...contentProps
    } = props
    const { ...restAttrs } = attrs as TooltipContentImplIntrinsicElement
    const inject = useTooltipInject(CONTENT_NAME, props.scopeOkuTooltip)
    const popperScope = usePopperScope(props.scopeOkuTooltip)
    const forwardedRef = useForwardRef()

    watchEffect((onClean) => {
      document.addEventListener(TOOLTIP_OPEN, () => emit('close'))
      onClean(() => {
        document.removeEventListener(TOOLTIP_OPEN, () => emit('close'))
      })
    })

    watchEffect((onClean) => {
      if (inject.trigger.value) {
        const handleScroll = (event: Event) => {
          const target = event.target as HTMLElement
          if (target.contains(inject.trigger.value))
            emit('close')
        }
        window.addEventListener('scroll', handleScroll, { capture: true })
        onClean(() => {
          window.removeEventListener('scroll', handleScroll, { capture: true })
        })
      }
    })

    visuallyHiddenContentProvider({
      scope: props.scopeOkuTooltip,
      isInside: true,
    })

    return () => h(OkuDismissableLayer, {
      asChild: true,
      disableOutsidePointerEvents: false,
      onEscapeKeyDown(event) {
        event.preventDefault()
      },
      onPointerdownOutside(event: any) {
        emit('pointerdownOutside', event)
      },
      onFocusoutSide(event: any) {
        emit('pointerdownOutside', event)
      },
      onDismiss() {
        emit('close')
      },
    }, {
      default: () => h(OkuPopperContent, {
        'data-state': inject.stateAttribute.value,
        ...popperScope,
        ...restAttrs,
        ...contentProps,
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
      }, [
        h(OkuSlottable, {}, {
          default: () => slots.default?.(),
        }),
        h(OkuVisuallyHidden, {
          id: inject.contentId.value,
          role: 'tooltip',
        }, {
          default: () => ariaLabel || slots.default?.(),
        }),
      ]),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuTooltipContentImpl = tooltipContentImpl as typeof tooltipContentImpl &
(new () => {
  $props: ScopeTooltip<Partial<TooltipContentImplElement>>
})
