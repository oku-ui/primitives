import { defineComponent, h, mergeProps, onBeforeUnmount, reactive, ref, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { primitiveProps } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import type { Side } from './utils'
import { getOpenState, whenMouse } from './utils'
import type { MenuItemImplElement, MenuSubTriggerEmits, MenuSubTriggerNativeElement } from './props'
import { MENU_SUB_TRIGGER_NAME, SUB_OPEN_KEYS, menuSubTriggerProps, scopedMenuProps, useMenuContentInject, useMenuInject, useMenuRootInject, useMenuSubInject } from './props'
import { OkuMenuAnchor } from './menu-anchor'
import { OkuMenuItemImpl } from './menu-item-impl'

const menuSubTrigger = defineComponent({
  name: MENU_SUB_TRIGGER_NAME,
  components: {
    OkuMenuAnchor,
    OkuMenuItemImpl,
  },
  inheritAttrs: false,
  props: {
    ...menuSubTriggerProps.props,
    // ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuSubTriggerProps.emits,
  setup(props, { attrs, emit, slots }) {
    const { scopeOkuMenu } = toRefs(props)

    const _reactive = reactive(menuSubTriggerProps)
    const reactiveMenuSubTriggerProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useMenuInject(MENU_SUB_TRIGGER_NAME, scopeOkuMenu.value)
    const rootInject = useMenuRootInject(MENU_SUB_TRIGGER_NAME, scopeOkuMenu.value)
    const subInject = useMenuSubInject(MENU_SUB_TRIGGER_NAME, scopeOkuMenu.value)
    const contentInject = useMenuContentInject(MENU_SUB_TRIGGER_NAME, scopeOkuMenu.value)
    const openTimerRef = ref<number | null>(null)
    const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentInject
    const scope = { scope: scopeOkuMenu.value }

    function clearOpenTimer() {
      if (openTimerRef.value)
        window.clearTimeout(openTimerRef.value)
      openTimerRef.value = null
    }

    onBeforeUnmount(() => clearOpenTimer)

    watchEffect(() => {
      const pointerGraceTimer = pointerGraceTimerRef.value
      return () => {
        window.clearTimeout(pointerGraceTimer)
        onPointerGraceIntentChange(null)
      }
    })

    return h(OkuMenuAnchor,
      {
        asChild: true,
        ...scope,
      },
      {
        default: () => h(OkuMenuItemImpl,
          {
            'id': subInject.triggerId.value,
            'aria-haspopup': 'menu',
            'aria-expanded': inject.open.value,
            'aria-controls': subInject.contentId.value,
            'data-state': getOpenState(inject.open.value!),
            ...mergeProps(attrs, reactiveMenuSubTriggerProps),
            'ref': useComposedRefs(forwardedRef, el => subInject.onTriggerChange(el as MenuItemImplElement)),
            // This is redundant for mouse users but we cannot determine pointer type from
            // click event and we cannot use pointerup event (see git history for reasons why)
            'onClick': (event: any) => {
              emit('click', event)
              if (props.disabled || event.defaultPrevented)
                return
              /**
               * We manually focus because iOS Safari doesn't always focus on click (e.g. buttons)
               * and we rely heavily on `onFocusOutside` for submenus to close when switching
               * between separate submenus.
               */
              event.currentTarget.focus()
              if (!inject.open.value)
                inject.onOpenChange(true)
            },
            'onPointermove': composeEventHandlers<MenuSubTriggerEmits['pointermove'][0]>((event) => {
              emit('pointermove', event)
            }, whenMouse((event: PointerEvent) => {
              contentInject.onItemEnter(event)
              if (event.defaultPrevented)
                return
              if (!props.disabled && !inject.open.value && !openTimerRef.value) {
                contentInject.onPointerGraceIntentChange(null)
                openTimerRef.value = window.setTimeout(() => {
                  inject.onOpenChange(true)
                  clearOpenTimer()
                }, 100)
              }
            })),
            'onPointerleave': composeEventHandlers<MenuSubTriggerEmits['pointerleave'][0]>((event) => {
              emit('pointerleave', event)
            }, whenMouse((event: PointerEvent) => {
              clearOpenTimer()

              const contentRect = inject.content.value?.getBoundingClientRect()
              if (contentRect) {
                // TODO: make sure to update this when we change positioning logic
                const side = inject.content.value?.dataset.side as Side
                const rightSide = side === 'right'
                const bleed = rightSide ? -5 : +5
                const contentNearEdge = contentRect[rightSide ? 'left' : 'right']
                const contentFarEdge = contentRect[rightSide ? 'right' : 'left']

                contentInject.onPointerGraceIntentChange({
                  area: [
                    // Apply a bleed on clientX to ensure that our exit point is
                    // consistently within polygon bounds
                    { x: event.clientX + bleed, y: event.clientY },
                    { x: contentNearEdge, y: contentRect.top },
                    { x: contentFarEdge, y: contentRect.top },
                    { x: contentFarEdge, y: contentRect.bottom },
                    { x: contentNearEdge, y: contentRect.bottom },
                  ],
                  side,
                })

                window.clearTimeout(pointerGraceTimerRef.value)
                pointerGraceTimerRef.value = window.setTimeout(
                  () => contentInject.onPointerGraceIntentChange(null),
                  300,
                )
              }
              else {
                contentInject.onTriggerLeave(event)
                if (event.defaultPrevented)
                  return

                // There's 100ms where the user may leave an item before the submenu was opened.
                contentInject.onPointerGraceIntentChange(null)
              }
            })),
            'onKeydown': composeEventHandlers<MenuSubTriggerEmits['keydown'][0]>((event) => {
              emit('keydown', event)
            }, (event) => {
              const isTypingAhead = contentInject.searchRef.value !== ''
              if (props.disabled || (isTypingAhead && event.key === ' '))
                return
              if (SUB_OPEN_KEYS[rootInject.dir.value].includes(event.key)) {
                inject.onOpenChange(true)
                // The trigger may hold focus if opened via pointer interaction
                // so we ensure content is given focus again when switching to keyboard.
                inject.content.value?.focus()
                // prevent window from scrolling
                event.preventDefault()
              }
            }),
          }, slots,
        ),
      },
    )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuSubTrigger = menuSubTrigger as typeof menuSubTrigger &
(new () => { $props: MenuSubTriggerNativeElement })
