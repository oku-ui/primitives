import type { PropType } from 'vue'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuPopperContent, type PopperContentEmits, type PopperContentProps, popperContentProps } from '@oku-ui/popper'
import { type FocusScopeEmits, type FocusScopeProps, OkuFocusScope } from '@oku-ui/focus-scope'
import { type DismissableLayerEmits, type DismissableLayerProps, OkuDismissableLayer, dismissableLayerProps } from '@oku-ui/dismissable-layer'
import { useFocusGuards } from '@oku-ui/focus-guards'
import { getState, scopePopoverProps } from './utils'
import { usePopoverInject, usePopperScope } from './popover'

export type PopoverContentImplNaviteElement = OkuElement<'label'>
export type PopoverContentImplElement = HTMLLabelElement

export interface PopoverContentImplProps
  extends PopperContentProps,
  DismissableLayerProps {
  /**
   * Whether focus should be trapped within the `Popover`
   * (default: false)
   */
  trapFocus?: FocusScopeProps['trapped']
}

export type PopoverContentImplEmits = {
  /**
   * Event handler called when auto-focusing on open.
   * Can be prevented.
   */
  openAutoFocus: [event: FocusScopeEmits['mountAutoFocus'][0]]
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  closeAutoFocus: [event: FocusScopeEmits['unmountAutoFocus'][0]]
} & Omit<DismissableLayerEmits, 'dismiss'>
& Omit<PopperContentEmits, 'placed'>

export const popoverContentImplProps = {
  props: {
    ...popperContentProps.props,
    ...dismissableLayerProps.props,
    trapFocus: {
      type: Boolean as PropType<FocusScopeProps['trapped']>,
      default: false,
    },
  },
  emits: {
    ...popperContentProps.emits,
    ...dismissableLayerProps.emits,
    // eslint-disable-next-line unused-imports/no-unused-vars
    openAutoFocus: (event: FocusScopeEmits['mountAutoFocus'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    closeAutoFocus: (event: FocusScopeEmits['unmountAutoFocus'][0]) => true,
  },
}

const NAME = 'OkuPopoverContentImpl'

const popoverContentImpl = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...popoverContentImplProps.props,
    ...primitiveProps,
    ...scopePopoverProps,
  },
  emits: popoverContentImplProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      trapFocus,
      disableOutsidePointerEvents,
      scopeOkuPopover,
      ...contentProps
    } = toRefs(props)
    const _reactive = reactive(contentProps)
    const reactiveContentProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = usePopoverInject(NAME, scopeOkuPopover.value)
    const popperScope = usePopperScope(scopeOkuPopover.value)

    const forwardedRef = useForwardRef()

    useFocusGuards()

    return () => h(OkuFocusScope, {
      asChild: true,
      loop: true,
      trapped: trapFocus.value,
      onMountAutoFocus: (event) => {
        emit('openAutoFocus', event)
      },
      onUnmountAutoFocus: (event) => {
        emit('closeAutoFocus', event)
      },
    }, {
      default: () => h(OkuDismissableLayer, {
        asChild: true,
        disableOutsidePointerEvents: disableOutsidePointerEvents.value,
        onInteractOutside: (event) => {
          emit('interactOutside', event)
        },
        onEscapeKeyDown: (event) => {
          emit('escapeKeyDown', event)
        },
        onPointerdownOutside: (event) => {
          emit('pointerdownOutside', event)
        },
        onFocusoutSide: (event) => {
          emit('focusoutSide', event)
        },
        onDismiss: () => {
          inject.onOpenChange(false)
        },
      }, {
        default: () => h(OkuPopperContent, {
          'data-state': getState(inject.open.value!),
          'role': 'dialog',
          'id': inject.contentId.value,
          ...popperScope,
          ...mergeProps(attrs, reactiveContentProps),
          'ref': forwardedRef,
          'style': {
            ...attrs.style as any,
            // re-namespace exposed content custom properties
            ...{
              '--oku-popover-content-transform-origin': 'var(--oku-popper-transform-origin)',
              '--oku-popover-content-available-width': 'var(--oku-popper-available-width)',
              '--oku-popover-content-available-height': 'var(--oku-popper-available-height)',
              '--oku-popover-trigger-width': 'var(--oku-popper-anchor-width)',
              '--oku-popover-trigger-height': 'var(--oku-popper-anchor-height)',
            },
          },
        }, {
          default: () => slots.default?.(),
        }),
      }),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopoverContentImpl = popoverContentImpl as typeof popoverContentImpl &
(new () => {
  $props: PopoverContentImplNaviteElement
})
