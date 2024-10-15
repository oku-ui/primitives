import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuPresence } from '@oku-ui/presence'
import type { MenuSubContentElement, MenuSubContentEmits, MenuSubContentNativeElement } from './props'
import { CollectionProvider, CollectionSlot, MENU_SUB_CONTENT_NAME, SUB_CLOSE_KEYS, menuSubContentProps, scopedMenuProps, useMenuInject, useMenuRootInject, useMenuSubInject, usePortalInject } from './props'
import { OkuMenuContentImpl } from './menu-content-impl'

const menuSubContent = defineComponent({
  name: MENU_SUB_CONTENT_NAME,
  components: {
    OkuPresence,
  },
  inheritAttrs: false,
  props: {
    ...menuSubContentProps.props,
    ...scopedMenuProps,
  },
  emits: menuSubContentProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuMenu,
      forceMount: _forceMount,
      ...restProps
    } = toRefs(props)

    const _other = reactive(restProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const portalInject = usePortalInject(MENU_SUB_CONTENT_NAME, scopeOkuMenu.value)
    const forceMount = computed(() => _forceMount.value || portalInject.forceMount?.value)

    const forwardedRef = useForwardRef()
    // const emits = useListeners()

    const inject = useMenuInject(MENU_SUB_CONTENT_NAME, scopeOkuMenu.value)
    const rootInject = useMenuRootInject(MENU_SUB_CONTENT_NAME, scopeOkuMenu.value)
    const subInject = useMenuSubInject(MENU_SUB_CONTENT_NAME, scopeOkuMenu.value)
    const menuSubContentRef = ref<MenuSubContentElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, menuSubContentRef)

    return () => h(CollectionProvider, { scope: scopeOkuMenu.value }, () => h(OkuPresence, { present: computed(() => forceMount.value || inject.open.value).value }, () => h(CollectionSlot, { scope: scopeOkuMenu.value }, () => h(OkuMenuContentImpl, {
      'id': subInject.contentId.value,
      'aria-labelledby': subInject.triggerId.value,
      ...mergeProps(attrs, otherProps),
      'ref': composedRefs,
      'align': 'start',
      'side': rootInject.dir.value === 'rtl' ? 'left' : 'right',
      'disableOutsidePointerEvents': false,
      'disableOutsideScroll': false,
      'trapFocus': false,
      'onOpenAutoFocus': (event) => {
        // when opening a submenu, focus content for keyboard users only
        if (rootInject.isUsingKeyboardRef.value) {
          emit('openAutoFocus', event)
          menuSubContentRef.value?.focus()
        }
        event.preventDefault()
      },
      // The menu might close because of focusing another menu item in the parent menu. We
      // don't want it to refocus the trigger in that case so we handle trigger focus ourselves.
      'onCloseAutoFocus': event => event.preventDefault(),
      'onFocusOutside': composeEventHandlers<MenuSubContentEmits['focusOutside'][0]>((event) => {
        emit('focusOutside', event)
      }, (event) => {
        // We prevent closing when the trigger is focused to avoid triggering a re-open animation
        // on pointer interaction.
        if (event.target !== subInject.trigger.value)
          inject.onOpenChange(false)
      }),
      'onEscapeKeydown': composeEventHandlers<MenuSubContentEmits['escapeKeydown'][0]>((event) => {
        emit('escapeKeydown', event)
      }, (event) => {
        rootInject.onClose()
        // ensure pressing escape in submenu doesn't escape full screen mode
        event.preventDefault()
      }),
      'onKeydown': composeEventHandlers<MenuSubContentEmits['keydown'][0]>((event) => {
        emit('keydown', event)
      }, (event) => {
        // Submenu key events bubble through portals. We only care about keys in this menu.
        const isKeyDownInside = (event.currentTarget as HTMLElement)?.contains(event.target as HTMLElement)
        const isCloseKey = SUB_CLOSE_KEYS[rootInject.dir.value].includes(event.key)
        if (isKeyDownInside && isCloseKey) {
          inject.onOpenChange(false)
          // We focus manually because we prevented it in `onCloseAutoFocus`
          subInject.trigger.value?.focus()
          // prevent window from scrolling
          event.preventDefault()
        }
      }),
    }, () => slots.default?.()))))
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuSubContent = menuSubContent as typeof menuSubContent & (new () => { $props: MenuSubContentNativeElement })
