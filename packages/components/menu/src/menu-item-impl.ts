import { defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { composeEventHandlers } from '@oku-ui/utils'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import type { MenuItemImplEmits, MenuItemImplNaviteElement } from './props'
import { CollectionItemSlot, MENU_ITEM_IMPL_NAME, MENU_ITEM_NAME, menuItemImplProps, scopedMenuProps, useMenuContentInject, useRovingFocusGroupScope } from './props'
import { whenMouse } from './utils'

const menuItemImpl = defineComponent({
  name: MENU_ITEM_IMPL_NAME,
  components: {
    OkuRovingFocusGroupItem,
  },
  inheritAttrs: false,
  props: {
    ...menuItemImplProps.props,
    ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuItemImplProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuMenu,
      disabled,
      textValue,
    } = toRefs(props)

    const forwardedRef = useForwardRef()

    const contentInject = useMenuContentInject(MENU_ITEM_NAME, scopeOkuMenu.value)
    const rovingFocusGroupScope = useRovingFocusGroupScope(scopeOkuMenu.value)
    const menuItemRef = ref<HTMLDivElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, el => menuItemRef.value = (el as HTMLDivElement))
    const isFocused = ref(false)

    // get the item's `.textContent` as default strategy for typeahead `textValue`
    const textContent = ref('')

    watchEffect(() => {
      const menuItem = menuItemRef.value
      if (menuItem)
        textContent.value = (menuItem.textContent ?? '').trim()
    })

    return () => h(CollectionItemSlot,
      {
        scope: scopeOkuMenu.value,
        disabled: disabled.value,
        textValue: textValue.value ?? textContent,
      },
      {
        default: () => h(OkuRovingFocusGroupItem,
          {
            asChild: true,
            ...rovingFocusGroupScope,
            focusable: !disabled.value,
          },
          {
            default: () => h(Primitive.div,
              {
                'role': 'menuitem',
                'data-highlighted': isFocused.value ? '' : undefined,
                'aria-disabled': disabled.value || undefined,
                'data-disabled': disabled.value ? '' : undefined,
                ...attrs,
                'ref': composedRefs,
                /**
                * We focus items on `pointerMove` to achieve the following:
                *
                * - Mouse over an item (it focuses)
                * - Leave mouse where it is and use keyboard to focus a different item
                * - Wiggle mouse without it leaving previously focused item
                * - Previously focused item should re-focus
                *
                * If we used `mouseOver`/`mouseEnter` it would not re-focus when the mouse
                * wiggles. This is to match native menu implementation.
                */
                'onPointermove': composeEventHandlers<MenuItemImplEmits['pointermove'][0]>(whenMouse((event) => {
                  if (disabled.value) {
                    contentInject.onItemLeave(event)
                  }
                  else {
                    contentInject.onItemEnter(event)
                    if (!event.defaultPrevented) {
                      const item = event.currentTarget
                      item.focus()
                    }
                  }
                }),
                ),
                'onPointerleave': composeEventHandlers<MenuItemImplEmits['pointerleave'][0]>(whenMouse(event => contentInject.onItemLeave(event))),
                'onFocus': composeEventHandlers<MenuItemImplEmits['focus'][0]>(() => isFocused.value = true),
                'onBlur': composeEventHandlers<MenuItemImplEmits['blur'][0]>(() => isFocused.value = false),
              }, slots,
            ),
          },
        ),
      },
    )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuItemImpl = menuItemImpl as typeof menuItemImpl &
(new () => { $props: MenuItemImplNaviteElement })
