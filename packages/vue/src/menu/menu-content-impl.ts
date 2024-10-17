import type { MenuContentElement, MenuContentImplEmits, MenuContentImplNativeElement } from './props'
import type { GraceIntent, Side } from './utils'
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import { useFocusGuards } from '@oku-ui/focus-guards'
import { OkuFocusScope } from '@oku-ui/focus-scope'
import { OkuPopperContent } from '@oku-ui/popper'
import { primitiveProps } from '@oku-ui/primitive'
import { OkuRovingFocusGroup } from '@oku-ui/roving-focus'
import { reactiveOmit, useComposedRefs, useForwardRef, useScrollLock } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { defineComponent, h, mergeProps, nextTick, onBeforeUnmount, reactive, ref, toRefs, watch } from 'vue'
import { FIRST_LAST_KEYS, LAST_KEYS, MENU_CONTENT_IMPL_NAME, MENU_CONTENT_NAME, menuContentImplProps, menuContentProvider, scopedMenuProps, useCollection, useMenuInject, useMenuRootInject, usePopperScope, useRovingFocusGroupScope } from './props'
import { focusFirst, getNextMatch, getOpenState, isPointerInGraceArea, whenMouse } from './utils'

const menuContentImpl = defineComponent({
  name: MENU_CONTENT_IMPL_NAME,
  components: {
    OkuFocusScope,
    OkuDismissableLayer,
    OkuRovingFocusGroup,
    OkuPopperContent,
  },
  inheritAttrs: false,
  props: {
    ...menuContentImplProps.props,
    ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuContentImplProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuMenu,
      loop,
      trapFocus,
      disableOutsidePointerEvents,
      disableOutsideScroll,
      ...restProps
    } = toRefs(props)

    const _other = reactive(restProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    // const emits = useListeners()

    const inject = useMenuInject(MENU_CONTENT_NAME, scopeOkuMenu.value)
    const rootInject = useMenuRootInject(MENU_CONTENT_NAME, scopeOkuMenu.value)
    const popperScope = usePopperScope(scopeOkuMenu.value)
    const rovingFocusGroupScope = useRovingFocusGroupScope(scopeOkuMenu.value)
    const getItems = useCollection(scopeOkuMenu.value)
    const currentItemId = ref<string | null>(null)
    const contentRef = ref<HTMLDivElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, contentRef, el => inject.onContentChange(el as MenuContentElement))
    const timerRef = ref(0)
    const searchRef = ref('')
    const pointerGraceTimerRef = ref(0)
    const pointerGraceIntentRef = ref<GraceIntent | null>(null)
    const pointerDirRef = ref<Side>('right')
    const lastPointerXRef = ref(0)

    const focusScopeRef = ref<HTMLElement | null>(null)
    const lock = useScrollLock(focusScopeRef)

    watch([disableOutsideScroll, focusScopeRef], () => {
      if (disableOutsideScroll.value)
        lock.value = true
      else
        lock.value = false
    })

    function handleTypeaheadSearch(key: string) {
      const search = searchRef.value + key
      const items = getItems().filter(item => !item.disabled)
      const currentItem = document.activeElement
      const currentMatch = items.find(item => item.ref === currentItem)?.textValue
      const values = items.map(item => item.textValue)
      const nextMatch = getNextMatch(values, search, currentMatch)
      const newItem = items.find(item => item.textValue === nextMatch)?.ref;

      // Reset `searchRef` 1 second after it was last updated
      (function updateSearch(value: string) {
        searchRef.value = value
        window.clearTimeout(timerRef.value)
        if (value !== '')
          timerRef.value = window.setTimeout(() => updateSearch(''), 1000)
      })(search)

      if (newItem) {
        /**
         * Imperative focus during keydown is risky so we prevent React's batching updates
         * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
         */
        setTimeout(() => (newItem as HTMLElement).focus())
      }
    }

    onBeforeUnmount(() => {
      window.clearTimeout(timerRef.value)
    })

    // Make sure the whole tree has focus guards as our `MenuContent` may be
    // the last element in the DOM (beacuse of the `Portal`)
    useFocusGuards()

    function isPointerMovingToSubmenu(event: PointerEvent) {
      const isMovingTowards = pointerDirRef.value === pointerGraceIntentRef.value?.side
      return isMovingTowards && isPointerInGraceArea(event, pointerGraceIntentRef.value?.area)
    }

    menuContentProvider({
      scope: scopeOkuMenu.value,
      searchRef,
      onItemEnter: (event) => {
        if (isPointerMovingToSubmenu(event))
          event.preventDefault()
      },
      onItemLeave: (event) => {
        if (isPointerMovingToSubmenu(event))
          return
        contentRef.value?.focus()
        currentItemId.value = null
      },
      onTriggerLeave: (event) => {
        if (isPointerMovingToSubmenu(event))
          event.preventDefault()
      },
      pointerGraceTimerRef,
      onPointerGraceIntentChange: (intent) => {
        pointerGraceIntentRef.value = intent
      },
    })

    return () => h(OkuFocusScope, {
      ref: focusScopeRef,
      asChild: true,
      trapped: trapFocus.value,
      onMountAutoFocus: composeEventHandlers<MenuContentImplEmits['openAutoFocus'][0]>((event) => {
        emit('openAutoFocus', event)
      }, (event) => {
        // when opening, explicitly focus the content area only and leave
        // `onEntryFocus` in  control of focusing first item
        event.preventDefault()
        contentRef.value?.focus()
      }),
      onUnmountAutoFocus: event => emit('closeAutoFocus', event),
    }, () => h(OkuDismissableLayer, {
      asChild: true,
      disableOutsidePointerEvents: disableOutsidePointerEvents.value,
      onEscapeKeydown: event => emit('escapeKeydown', event),
      onPointerdownOutside: event => emit('pointerdownOutside', event),
      onFocusOutside: event => emit('focusOutside', event),
      onInteractOutside: event => emit('interactOutside', event),
      onDismiss: () => emit('dismiss'),
    }, () => h(OkuRovingFocusGroup, {
      asChild: true,
      ...rovingFocusGroupScope,
      dir: rootInject.dir.value,
      orientation: 'vertical',
      loop: loop.value,
      currentTabStopId: currentItemId.value,
      onCurrentTabStopIdChange: (tabStopId) => {
        currentItemId.value = tabStopId
      },
      onEntryFocus: composeEventHandlers<MenuContentImplEmits['entryFocus'][0]>((event) => {
        emit('entryFocus', event)
      }, (event) => {
        // only focus first item when using keyboard
        if (!rootInject.isUsingKeyboardRef.value)
          event.preventDefault()
      }),
    }, () => h(OkuPopperContent, {
      'role': 'menu',
      'aria-orientation': 'vertical',
      'data-state': getOpenState(inject.open.value!),
      'data-oku-menu-content': '',
      'dir': rootInject.dir.value,
      ...popperScope,
      ...mergeProps(attrs, otherProps),
      'ref': composedRefs,
      'style': { outline: 'none', ...attrs.style as any },
      'onKeydown': composeEventHandlers<MenuContentImplEmits['keydown'][0]>((event) => {
        emit('keydown', event)
      }, (event) => {
        // submenu key events bubble through portals. We only care about keys in this menu.
        const target = event.target as HTMLElement
        const isKeyDownInside = target.closest('[data-oku-menu-content]') === event.currentTarget
        const isModifierKey = event.ctrlKey || event.altKey || event.metaKey
        const isCharacterKey = event.key.length === 1
        if (isKeyDownInside) {
          // menus should not be navigated using tab key so we prevent it
          if (event.key === 'Tab')
            event.preventDefault()
          if (!isModifierKey && isCharacterKey)
            handleTypeaheadSearch(event.key)
        }
        // focus first/last item based on key pressed
        const content = contentRef.value
        if (event.target !== content)
          return
        if (!FIRST_LAST_KEYS.includes(event.key))
          return
        event.preventDefault()
        const items = getItems().filter(item => !item.disabled)
        const candidateNodes = items.map(item => item.ref!)
        if (LAST_KEYS.includes(event.key))
          candidateNodes.reverse()
        focusFirst(candidateNodes)
      }),
      'onBlur': composeEventHandlers<MenuContentImplEmits['blur'][0]>((event) => {
        emit('blur', event)
      }, async (event) => {
        // clear search buffer when leaving the menu
        if (!(event.currentTarget as HTMLElement).contains(event.target as HTMLElement)) {
          await nextTick()

          window.clearTimeout(timerRef.value)
          searchRef.value = ''
        }
      }),
      'onPointermove': composeEventHandlers<MenuContentImplEmits['pointermove'][0]>((event) => {
        emit('pointermove', event)
      }, whenMouse((event) => {
        const target = event.target as HTMLDivElement
        const pointerXHasChanged = lastPointerXRef.value !== event.clientX
        // We don't use `event.movementX` for this check because Safari will
        // always return `0` on a pointer event.
        if ((event.currentTarget as HTMLElement).contains(target) && pointerXHasChanged) {
          const newDir = event.clientX > lastPointerXRef.value ? 'right' : 'left'
          pointerDirRef.value = newDir
          lastPointerXRef.value = event.clientX
        }
      })),
    }, () => slots.default?.()))))
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuContentImpl = menuContentImpl as typeof menuContentImpl & (new () => { $props: MenuContentImplNativeElement })
