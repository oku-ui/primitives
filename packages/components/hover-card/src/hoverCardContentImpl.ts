import { defineComponent, h, mergeProps, ref, watchEffect } from 'vue'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { type DismissableLayerEmits, OkuDismissableLayer, type DismissableLayerProps as OkuDismissableLayerProps } from '@oku-ui/dismissable-layer'
import { OkuPopperContent, popperContentProps } from '@oku-ui/popper'
import type { PopperContentProps as OkuPopperContentProps, PopperContentElement, PopperContentEmits, PopperContentNaviteElement } from '@oku-ui/popper'
import { OkuSlottable } from '@oku-ui/slot'
import { OkuVisuallyHidden } from '@oku-ui/visually-hidden'
import { composeEventHandlers } from '@oku-ui/utils'
import { createHoverCardProvide, getTabbableNodes, scopeHoverCardProps } from './utils'
import { HOVERCARD_NAME, useHoverCardInject, usePopperScope } from './hoverCard'

let originalBodyUserSelect: string

const CONTENT_NAME = 'OkuHoverCardContentImpl'

const [visuallyHiddenContentProvider, useVisuallyHiddenContentInject]
  = createHoverCardProvide(HOVERCARD_NAME, { isInside: ref(false) })

export {
  useVisuallyHiddenContentInject,
}

export type HoverCardContentImplNaviteElement = PopperContentNaviteElement
export type HoverCardContentImplElement = PopperContentElement
export type DismissableLayerProps = OkuDismissableLayerProps
export type PopperContentProps = OkuPopperContentProps

export interface HoverCardContentImplProps extends PopperContentProps { }

export type HoverCardContentImplEmits = Omit<PopperContentEmits, 'placed'> & {
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
  /***
   *
   */
  focusoutSide: [event: DismissableLayerEmits['focusoutSide'][0]]
  interactOutside: [event: DismissableLayerEmits['interactOutside'][0]]
  pointerdown: [event: PointerEvent]
  close: []
}

export const hoverCardContentImplProps = {
  props: {
    ...popperContentProps.props,
    ...primitiveProps,
  },
  emits: {
    ...propsOmit(popperContentProps.emits, ['placed']),
    // eslint-disable-next-line unused-imports/no-unused-vars
    escapeKeyDown: (event: DismissableLayerEmits['escapeKeyDown'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdownOutside: (event: DismissableLayerEmits['pointerdownOutside'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    focusoutSide: (event: DismissableLayerEmits['focusoutSide'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    interactOutside: (event: DismissableLayerEmits['interactOutside'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdown: (event: MouseEvent) => true,
    close: () => true,
  },
}

const hoverCardContentImpl = defineComponent({
  name: CONTENT_NAME,
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
      asChild: _asChild,
      scopeOkuHoverCard: _scope,
      onEscapeKeyDown: _onEscapeKeyDown,
      onPointerdownOutside: _onPointerDownOutside,
      onFocusoutSide: _onFocusOutside,
      onInteractOutside: _onInteractOutside,
      ...contentProps
    } = props

    const inject = useHoverCardInject(CONTENT_NAME, props.scopeOkuHoverCard)
    const popperScope = usePopperScope(props.scopeOkuHoverCard)

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
        ...mergeProps(attrs, contentProps),
        asChild: props.asChild,
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
