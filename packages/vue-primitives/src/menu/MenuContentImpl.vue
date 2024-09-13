<script setup lang="ts">
import type { MenuContentImplEmits, MenuContentImplProps } from './MenuContentImpl.ts'
import { onBeforeUnmount, shallowRef } from 'vue'
import { useDismissableLayer } from '../dismissable-layer/index.ts'
import { useFocusGuards } from '../focus-guards/index.ts'
import { useFocusScope } from '../focus-scope/index.ts'
import { useForwardElement, useRef } from '../hooks/index.ts'
import { PopperContent, usePopperContext } from '../popper/index.ts'
import { useRovingFocusGroupRoot } from '../roving-focus/index.ts'
import { focusFirst } from '../utils/focusFirst.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { provideMenuContentContext } from './MenuContent.ts'
import { Collection, FIRST_LAST_KEYS, LAST_KEYS, useCollection, useMenuContext, useMenuRootContext } from './MenuRoot.ts'
import { getNextMatch, getOpenState, type GraceIntent, isPointerInGraceArea, type Side } from './utils.ts'

defineOptions({
  name: 'MenuContentImpl',
})

const props = withDefaults(defineProps<MenuContentImplProps>(), {
  loop: false,
})

const emit = defineEmits<MenuContentImplEmits>()

const context = useMenuContext('MenuContentImpl')
const rootContext = useMenuRootContext('MenuContentImpl')
const popperContext = usePopperContext('MenuContentImpl')

const currentItemId = shallowRef<string>()

const elRef = useRef<HTMLDivElement>()
const forwardElement = useForwardElement<HTMLDivElement>(elRef)
const getItems = useCollection(Collection.provideCollectionContext(elRef))

let timerRef = 0
const searchRef = useRef('')
const pointerGraceTimerRef = useRef(0)
let pointerGraceIntentRef: GraceIntent | undefined
let pointerDirRef: Side = 'right'
let lastPointerXRef = 0

// TODO: ScrollLock
// const ScrollLockWrapper = disableOutsideScroll ? RemoveScroll : React.Fragment
// const scrollLockWrapperProps = disableOutsideScroll
// ? { as: Slot, allowPinchZoom: true }
// : undefined

function handleTypeaheadSearch(key: string) {
  const search = searchRef.current + key
  const items = getItems().filter(item => !item.$$rcid.menu.disabled)
  const currentItem = document.activeElement
  const currentMatch = items.find(item => item === currentItem)?.$$rcid.menu.textValue
  const values = items.map(item => item.$$rcid.menu.textValue)
  const nextMatch = getNextMatch(values, search, currentMatch)
  const newItem = items.find(item => item.$$rcid.menu.textValue === nextMatch);

  // Reset `searchRef` 1 second after it was last updated
  (function updateSearch(value: string) {
    searchRef.current = value
    window.clearTimeout(timerRef)
    if (value !== '')
      timerRef = window.setTimeout(() => updateSearch(''), 1000)
  })(search)

  if (newItem) {
    /**
     * Imperative focus during keydown is risky so we prevent React's batching updates
     * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
     */
    setTimeout(() => {
      ;(newItem as HTMLElement).focus()
    })
  }
}

onBeforeUnmount(() => {
  window.clearTimeout(timerRef)
})

// Make sure the whole tree has focus guards as our `MenuContent` may be
// the last element in the DOM (because of the `Portal`)
useFocusGuards()

function isPointerMovingToSubmenu(event: PointerEvent) {
  const isMovingTowards = pointerDirRef === pointerGraceIntentRef?.side
  return isMovingTowards && isPointerInGraceArea(event, pointerGraceIntentRef?.area)
}

provideMenuContentContext({
  onItemEnter(event) {
    if (isPointerMovingToSubmenu(event))
      event.preventDefault()
  },
  onItemLeave(event) {
    if (isPointerMovingToSubmenu(event))
      return
    popperContext.content.value?.focus()
    currentItemId.value = undefined
  },
  onTriggerLeave(event) {
    if (isPointerMovingToSubmenu(event))
      event.preventDefault()
  },
  searchRef,
  pointerGraceTimerRef,
  onPointerGraceIntentChange(intent) {
    pointerGraceIntentRef = intent
  },
})

// Hanldlers

const onBlur = composeEventHandlers<FocusEvent>((event) => {
  emit('blur', event)
}, (event) => {
  // clear search buffer when leaving the menu
  if (!(event.currentTarget as HTMLElement | null)?.contains(event.target as HTMLElement | null)) {
    window.clearTimeout(timerRef)
    searchRef.current = ''
  }
})

const onPointermove = composeEventHandlers<PointerEvent>((event) => {
  emit('pointermove', event)
}, (event) => {
  if (event.pointerType !== 'mouse')
    return
  const target = event.target as HTMLElement
  const pointerXHasChanged = lastPointerXRef !== event.clientX

  // We don't use `event.movementX` for this check because Safari will
  // always return `0` on a pointer event.
  if ((event.currentTarget as HTMLElement | null)?.contains(target) && pointerXHasChanged) {
    const newDir = event.clientX > lastPointerXRef ? 'right' : 'left'
    pointerDirRef = newDir
    lastPointerXRef = event.clientX
  }
})

// Inner content

// COMP::FocusScope
const focusScope = useFocusScope(
  popperContext.content,
  {
    trapped() {
      return props.trapFocus
    },
  },
  {
    onMountAutoFocus: composeEventHandlers((event) => {
      emit('openAutoFocus', event)
    }, (event) => {
      // when opening, explicitly focus the content area only and leave
      // `onEntryFocus` in  control of focusing first item
      event.preventDefault()
      popperContext.content.value?.focus({ preventScroll: true })
    }),
    onUnmountAutoFocus(event: Event) {
      emit('closeAutoFocus', event)
    },
  },
)

// COMP::DismissableLayer

const dismissableLayer = useDismissableLayer(popperContext.content, {
  disableOutsidePointerEvents() {
    return props.disableOutsidePointerEvents
  },
}, {
  onInteractOutside(event) {
    emit('interactOutside', event)
  },
  onEscapeKeydown(event) {
    emit('escapeKeydown', event)
  },
  onDismiss() {
    emit('dismiss')
  },
  onFocusOutside(event) {
    emit('focusOutside', event)
  },
  onPointerdownOutside(event) {
    emit('pointerdownOutside', event)
  },
})

// COMP::RovingFocusGroupRoot

const rovingFocusGroupRoot = useRovingFocusGroupRoot(elRef, {
  currentTabStopId() {
    return currentItemId.value
  },
  preventScrollOnEntryFocus: true,
  orientation() {
    return 'vertical'
  },
  loop() {
    return props.loop
  },
  dir: rootContext.dir,
}, {
  onMousedown(event) {
    emit('mousedown', event)
  },
  onFocus(event) {
    emit('focus', event)
  },
  onFocusout(event) {
    emit('focusout', event)
  },
  updateCurrentTabStopId(tabStopId) {
    currentItemId.value = tabStopId
  },
  onEntryFocus: composeEventHandlers((event) => {
    emit('entryFocus', event)
  }, (event) => {
  // only focus first item when using keyboard
    if (!rootContext.isUsingKeyboardRef.current)
      event.preventDefault()
  }),
})

// COMP::PopperRoot

const onKeydown = composeEventHandlers<KeyboardEvent>(focusScope.onKeydown, (event) => {
  // submenu key events bubble through portals. We only care about keys in this menu.
  const target = event.target as HTMLElement
  const isKeyDownInside = target.closest('[data-radix-menu-content]') === event.currentTarget
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
  const content = popperContext.content.value

  if (event.target !== content)
    return

  if (!FIRST_LAST_KEYS.includes(event.key))
    return

  event.preventDefault()
  const candidateNodes = getItems().filter(item => !item.$$rcid.menu.disabled)

  if (LAST_KEYS.includes(event.key))
    candidateNodes.reverse()
  focusFirst(candidateNodes)
})
</script>

<template>
  <PopperContent
    :ref="forwardElement"
    tabindex="-1"

    data-dismissable-layer

    data-orientation="vertical"

    role="menu"
    aria-orientation="vertical"
    :data-state="getOpenState(context.open())"
    :dir="rootContext.dir.value"
    data-radix-menu-content=""

    :style="{
      outline: 'none',
      pointerEvents: dismissableLayer.pointerEvents(),
    }"

    @keydown="onKeydown"

    @blur="onBlur"
    @pointermove="onPointermove"
    @mousedown="rovingFocusGroupRoot.onMousedown"
    @focus="rovingFocusGroupRoot.onFocus"
    @focusout="rovingFocusGroupRoot.onFocusout"
  >
    <slot />
  </PopperContent>
</template>
