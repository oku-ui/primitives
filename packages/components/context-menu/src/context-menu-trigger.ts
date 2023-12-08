import { Fragment, defineComponent, h, mergeProps, onBeforeUnmount, reactive, ref, toRefs } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuMenuAnchor } from '@oku-ui/menu'
import { CONTEXT_MENU_TRIGGER_NAME, contextMenuTriggerProps, scopedContextMenuProps, useContextMenuInject, useMenuScope } from './props'
import type { ContextMenuTriggerEmits, ContextMenuTriggerNativeElement, Point } from './props'
import { whenTouchOrPen } from './utils'

const contextMenuTrigger = defineComponent({
  name: CONTEXT_MENU_TRIGGER_NAME,
  components: {
    OkuMenuAnchor,
  },
  inheritAttrs: false,
  props: {
    ...contextMenuTriggerProps.props,
    ...scopedContextMenuProps,
  },
  emits: contextMenuTriggerProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuContextMenu,
      disabled,
      ...triggerProps
    } = toRefs(props)

    const _other = reactive(triggerProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const inject = useContextMenuInject(CONTEXT_MENU_TRIGGER_NAME, scopeOkuContextMenu.value)
    const menuScope = useMenuScope(scopeOkuContextMenu.value)
    const pointRef = ref<Point>({ x: 0, y: 0 })
    const virtualRef = ref({ getBoundingClientRect: () => DOMRect.fromRect({ width: 0, height: 0, ...pointRef.value }) })
    const longPressTimerRef = ref(0)
    const clearLongPress = () => window.clearTimeout(longPressTimerRef.value)
    const handleOpen = (event: MouseEvent | PointerEvent) => {
      pointRef.value = { x: event.clientX, y: event.clientY }
      inject.onOpenChange(true)
    }

    onBeforeUnmount(() => clearLongPress())

    onBeforeUnmount(() => {
      if (disabled.value)
        clearLongPress()
    })

    return () => h(Fragment, [
      h(OkuMenuAnchor, {
        ...menuScope,
        virtualRef: virtualRef.value,
      }),

      h(Primitive.span, {
        'data-state': inject.open.value ? 'open' : 'closed',
        'data-disabled': disabled.value ? '' : undefined,
        ...mergeProps(attrs, otherProps, emits),
        'ref': forwardedRef,
        // prevent iOS context menu from appearing
        'style': { WebkitTouchCallout: 'none', ...attrs.style as any },
        // if trigger is disabled, enable the native Context Menu
        'onContextmenu': composeEventHandlers<ContextMenuTriggerEmits['contextmenu'][0]>((event) => {
          if (disabled.value)
            emit('contextmenu', event)
        }, (event) => {
          // clearing the long press here because some platforms already support
          // long press to trigger a `contextmenu` event
          clearLongPress()
          handleOpen(event)
          event.preventDefault()
        }),
        'onPointerdown': composeEventHandlers<ContextMenuTriggerEmits['pointerdown'][0]>((event) => {
          if (disabled.value)
            emit('pointerdown', event)
        }, whenTouchOrPen((event) => {
          // clear the long press here in case there's multiple touch points
          clearLongPress()
          longPressTimerRef.value = window.setTimeout(() => handleOpen(event), 700)
        })),
        'onPointermove': composeEventHandlers<ContextMenuTriggerEmits['pointermove'][0]>((event) => {
          if (disabled.value)
            emit('pointermove', event)
        }, whenTouchOrPen(clearLongPress)),
        'onPointercancel': composeEventHandlers<ContextMenuTriggerEmits['pointercancel'][0]>((event) => {
          if (disabled.value)
            emit('pointercancel', event)
        }, whenTouchOrPen(clearLongPress)),
        'onPointerup': composeEventHandlers<ContextMenuTriggerEmits['pointerup'][0]>((event) => {
          if (disabled.value)
            emit('pointerup', event)
        }, whenTouchOrPen(clearLongPress)),
      }, slots),
    ])
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuContextMenuTrigger = contextMenuTrigger as typeof contextMenuTrigger &
  (new () => { $props: ContextMenuTriggerNativeElement })
