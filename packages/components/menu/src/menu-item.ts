import { defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import { composeEventHandlers } from '@oku-ui/utils'
import { reactiveOmit, useComposedRefs, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { dispatchDiscreteCustomEvent } from '@oku-ui/primitive'
import type { MenuItemEmits, MenuItemNativeElement } from './props'
import { ITEM_SELECT, MENU_ITEM_NAME, SELECTION_KEYS, menuItemProps, scopedMenuProps, useMenuContentInject, useMenuRootInject } from './props'
import { OkuMenuItemImpl } from './menu-item-impl'

const menuItem = defineComponent({
  name: MENU_ITEM_NAME,
  components: {
    OkuMenuItemImpl,
  },
  inheritAttrs: false,
  props: {
    ...menuItemProps.props,
    ...scopedMenuProps,
  },
  emits: menuItemProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuMenu,
      disabled,
      ...restProps
    } = toRefs(props)

    const _other = reactive(restProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const menuItemRef = ref<HTMLDivElement | null>(null)
    const rootInject = useMenuRootInject(MENU_ITEM_NAME, scopeOkuMenu.value)
    const contentInject = useMenuContentInject(MENU_ITEM_NAME, scopeOkuMenu.value)
    const composedRefs = useComposedRefs(forwardedRef, el => menuItemRef.value = (el as HTMLDivElement))
    const isPointerDownRef = ref(false)

    function handleSelect() {
      const menuItem = menuItemRef.value
      if (!disabled.value && menuItem) {
        const itemSelectEvent = new CustomEvent(ITEM_SELECT, { bubbles: true, cancelable: true })
        menuItem.addEventListener(ITEM_SELECT, event => emit('select', event), { once: true })
        dispatchDiscreteCustomEvent(menuItem, itemSelectEvent)
        if (itemSelectEvent.defaultPrevented)
          isPointerDownRef.value = false
        else
          rootInject.onClose()
      }
    }

    return () => h(OkuMenuItemImpl,
      {
        ...mergeProps(attrs, otherProps, emits),
        ref: composedRefs,
        disabled: disabled.value,
        onClick: composeEventHandlers<MenuItemEmits['click'][0]>((event) => {
          emit('click', event)
        }, () => handleSelect),
        onPointerdown: composeEventHandlers<MenuItemEmits['pointerdown'][0]>((event) => {
          emit('pointerdown', event)
        }, () => isPointerDownRef.value = true),
        onPointerup: composeEventHandlers<MenuItemEmits['pointerup'][0]>((event) => {
          emit('pointerup', event)
        }, (event) => {
          // Pointer down can move to a different menu item which should activate it on pointer up.
          // We dispatch a click for selection to allow composition with click based triggers and to
          // prevent Firefox from getting stuck in text selection mode when the menu closes.
          if (!isPointerDownRef.value)
            (event.currentTarget as HTMLElement)?.click()
        }),
        onKeydown: composeEventHandlers<MenuItemEmits['keydown'][0]>((event) => {
          emit('keydown', event)
        }, (event) => {
          const isTypingAhead = contentInject.searchRef.value !== ''
          if (disabled.value || (isTypingAhead && event.key === ' '))
            return
          if (SELECTION_KEYS.includes(event.key)) {
            (event.currentTarget as HTMLElement)?.click()
            /**
             * We prevent default browser behaviour for selection keys as they should trigger
             * a selection only:
             * - prevents space from scrolling the page.
             * - if keydown causes focus to move, prevents keydown from firing on the new target.
             */
            event.preventDefault()
          }
        }),
      }, slots,
    )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuItem = menuItem as typeof menuItem &
(new () => { $props: MenuItemNativeElement })
