import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { reactiveOmit, useComposedRefs, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuMenuAnchor } from '@oku-ui/menu'
import { DROPDOWN_MENU_TRIGGER_NAME, dropdownMenuTriggerProps, scopedDropdownMenuProps, useDropdownMenuInject, useMenuScope } from './props'
import type { DropdownMenuTriggerEmits, DropdownMenuTriggerNativeElement } from './props'

const dropdownMenuTrigger = defineComponent({
  name: DROPDOWN_MENU_TRIGGER_NAME,
  components: {
    OkuMenuAnchor,
  },
  inheritAttrs: false,
  props: {
    ...dropdownMenuTriggerProps.props,
    ...scopedDropdownMenuProps,
  },
  emits: dropdownMenuTriggerProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuDropdownMenu,
      disabled,
      ...triggerProps
    } = toRefs(props)

    const _other = reactive(triggerProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const inject = useDropdownMenuInject(DROPDOWN_MENU_TRIGGER_NAME, scopeOkuDropdownMenu.value)
    const menuScope = useMenuScope(scopeOkuDropdownMenu.value)

    return () => h(OkuMenuAnchor, {
      asChild: true,
      ...menuScope,
    }, {
      default: () => h(Primitive.button, {
        'type': 'button',
        'id': inject.triggerId.value,
        'aria-haspopup': 'menu',
        'aria-expanded': inject.open.value,
        'aria-controls': inject.open.value ? inject.contentId.value : undefined,
        'data-state': inject.open.value ? 'open' : 'closed',
        'data-disabled': disabled.value ? '' : undefined,
        'disabled': disabled.value,
        ...mergeProps(attrs, otherProps, emits),
        'ref': useComposedRefs(forwardedRef, inject.triggerRef),
        'onPointerdown': composeEventHandlers<DropdownMenuTriggerEmits['pointerdown'][0]>((event) => {
          emit('pointerdown', event)
        }, (event) => {
          // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
          // but not when the control key is pressed (avoiding MacOS right click)
          if (!disabled.value && event.button === 0 && event.ctrlKey === false) {
            inject.onOpenToggle()
            // prevent trigger focusing when opening
            // this allows the content to be given focus without competition
            if (!inject.open.value)
              event.preventDefault()
          }
        }),
        'onKeydown': composeEventHandlers<DropdownMenuTriggerEmits['keydown'][0]>((event) => {
          emit('keydown', event)
        }, (event) => {
          if (disabled.value)
            return
          if (['Enter', ' '].includes(event.key))
            inject.onOpenToggle()
          if (event.key === 'ArrowDown')
            inject.onOpenChange(true)
            // prevent keydown from scrolling window / first focused item to execute
            // that keydown (inadvertently closing the menu)
          if (['Enter', ' ', 'ArrowDown'].includes(event.key))
            event.preventDefault()
        }),
      }, slots),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDropdownMenuTrigger = dropdownMenuTrigger as typeof dropdownMenuTrigger &
(new () => { $props: DropdownMenuTriggerNativeElement })
