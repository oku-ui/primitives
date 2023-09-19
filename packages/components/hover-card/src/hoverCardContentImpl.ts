import { defineComponent, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import { OkuPopperContent } from '@oku-ui/popper'
import { OkuSlottable } from '@oku-ui/slot'
import { OkuVisuallyHidden } from '@oku-ui/visually-hidden'
import { composeEventHandlers } from '@oku-ui/utils'
import { getTabbableNodes } from './utils'
import { CONTENT_NAME, CONTENT_NAME_IMPL, hoverCardContentImplProps, scopeHoverCardProps, useHoverCardInject, usePopperScope } from './props'

import type { HoverCardContentImplEmits, HoverCardContentImplNaviteElement } from './props'

let originalBodyUserSelect: string

const hoverCardContentImpl = defineComponent({
  name: CONTENT_NAME_IMPL,
  components: {
    OkuDismissableLayer,
    OkuPopperContent,
    OkuSlottable,
    OkuVisuallyHidden,
  },
  inheritAttrs: false,
  props: {
    ...hoverCardContentImplProps.props,
    ...primitiveProps,
    ...scopeHoverCardProps,
  },
  emits: hoverCardContentImplProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuHoverCard,
      // onEscapeKeyDown: _onEscapeKeyDown,
      // onPointerdownOutside: _onPointerDownOutside,
      // onFocusoutSide: _onFocusOutside,
      // onInteractOutside: _onInteractOutside,
      ...contentProps
    } = toRefs(props)

    const _reactive = reactive(contentProps)
    const reactiveContentProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = useHoverCardInject(CONTENT_NAME, scopeOkuHoverCard.value)
    const popperScope = usePopperScope(scopeOkuHoverCard.value)

    const contentRef = ref<HTMLDivElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(contentRef, forwardedRef)

    const containSelection = ref(false)

    watchEffect((onClean) => {
      const body = document.body
      if (containSelection.value) {
        // Safari requires prefix
        originalBodyUserSelect = body.style.userSelect || body.style.webkitUserSelect

        body.style.userSelect = 'none'
        body.style.webkitUserSelect = 'none'
      }

      onClean(() => {
        body.style.userSelect = originalBodyUserSelect
        body.style.webkitUserSelect = originalBodyUserSelect
      })
    })

    watchEffect((onClean) => {
      if (contentRef.value) {
        const handlePointerUp = () => {
          containSelection.value = false
          inject.isPointerDownOnContentRef.value = false

          // Delay a frame to ensure we always access the latest selection
          setTimeout(() => {
            const hasSelection = document.getSelection()?.toString() !== ''
            if (hasSelection)
              inject.hasSelectionRef.value = true
          })
        }

        document.addEventListener('pointerup', handlePointerUp)

        onClean(() => {
          document.removeEventListener('pointerup', handlePointerUp)
          inject.hasSelectionRef.value = false
          inject.isPointerDownOnContentRef.value = false
        })
      }
    })

    watchEffect(() => {
      if (contentRef.value) {
        const tabbables = getTabbableNodes(contentRef.value)
        tabbables.forEach((tabbable: any) => tabbable.setAttribute('tabindex', '-1'))
      }
    })

    return () => h(OkuDismissableLayer, {
      asChild: true,
      disableOutsidePointerEvents: false,
      onInteractOutside(event) {
        emit('interactOutside', event)
      },
      onEscapeKeyDown(event) {
        emit('escapeKeyDown', event)
      },
      onPointerdownOutside(event) {
        emit('pointerdownOutside', event)
      },
      onFocusoutSide: composeEventHandlers<HoverCardContentImplEmits['focusoutSide'][0]>((el) => {
        emit('focusoutSide', el)
      }, (event) => {
        event.preventDefault()
      }),
      onDismiss() {
        inject.onDismiss()
      },
    }, {
      default: () => h(OkuPopperContent, {
        ...popperScope,
        ...mergeProps(attrs, reactiveContentProps),
        onPointerdown: composeEventHandlers<HoverCardContentImplEmits['pointerdown'][0]>((el) => {
          emit('pointerdown', el)
        }, (event) => {
          const target = event.currentTarget as HTMLElement
          // Contain selection to current layer
          if (target.contains(event.target as HTMLElement))
            containSelection.value = true

          inject.hasSelectionRef.value = false
          inject.isPointerDownOnContentRef.value = true
        }),
        ref: composedRefs,
        style: {
          ...attrs.style as any,
          userSelect: containSelection.value ? 'text' : undefined,
          // Safari requires prefix
          WebkitUserSelect: containSelection.value ? 'text' : undefined,
          // re-namespace exposed content custom properties
          ...{
            '--oku-hover-card-content-transform-origin': 'var(--oku-popper-transform-origin)',
            '--oku-hover-card-content-available-width': 'var(--oku-popper-available-width)',
            '--oku-hover-card-content-available-height': 'var(--oku-popper-available-height)',
            '--oku-hover-card-trigger-width': 'var(--oku-popper-anchor-width)',
            '--oku-hover-card-trigger-height': 'var(--oku-popper-anchor-height)',
          },
        },
      }, slots),
    })
  },
})

export const OkuHoverCardContentImpl = hoverCardContentImpl as typeof hoverCardContentImpl &
(new () => {
  $props: HoverCardContentImplNaviteElement
})
