import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuPopperContent } from '@oku-ui/popper'
import { OkuFocusScope } from '@oku-ui/focus-scope'
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import { useFocusGuards } from '@oku-ui/focus-guards'
import type { PopoverContentImplNaviteElement } from './props'
import { CONTENT_IMPL_NAME, popoverContentImplProps, scopePopoverProps, usePopoverInject, usePopperScope } from './props'
import { getState } from './utils'

const popoverContentImpl = defineComponent({
  name: CONTENT_IMPL_NAME,
  inheritAttrs: false,
  props: {
    ...popoverContentImplProps.props,
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

    const inject = usePopoverInject(CONTENT_IMPL_NAME, scopeOkuPopover.value)
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
        onEscapeKeydown: (event) => {
          emit('escapeKeydown', event)
        },
        onPointerdownOutside: (event) => {
          emit('pointerdownOutside', event)
        },
        onFocusOutside: (event) => {
          emit('focusOutside', event)
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
