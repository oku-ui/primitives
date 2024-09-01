<script setup lang="ts">
import { shallowRef } from 'vue'
import { useDirection } from '../direction/index.ts'
import { useControllableState, useForwardElement, useRef } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { ENTRY_FOCUS, EVENT_OPTIONS, focusFirst } from './utils.ts'
import { Collection, type RovingFocusGroupRootEmits, type RovingFocusGroupRootProps, provideRovingFocusContext, useCollection } from './RovingFocusGroupRoot.ts'

defineOptions({
  name: 'RovingFocusGroupRoot',
})
const props = withDefaults(defineProps<RovingFocusGroupRootProps>(), {
  loop: false,
  preventScrollOnEntryFocus: false,
})
const emit = defineEmits<RovingFocusGroupRootEmits>()
const $el = useRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const dir = useDirection(() => props.dir)
const currentTabStopId = useControllableState(props, v => emit('update:currentTabStopId', v), 'currentTabStopId', props.defaultCurrentTabStopId)

const collectionContext = Collection.provideCollectionContext($el)
const getItems = useCollection(collectionContext)
const isTabbingBackOut = shallowRef(false)
let isClickFocus = false
const focusableItemsCount = shallowRef(0)

const onMousedown = composeEventHandlers<MouseEvent>((event) => {
  emit('mousedown', event)
}, () => {
  isClickFocus = true
})

const onFocus = composeEventHandlers<FocusEvent>((event) => {
  emit('focus', event)
}, (event) => {
  // We normally wouldn't need this check, because we already check
  // that the focus is on the current target and not bubbling to it.
  // We do this because Safari doesn't focus buttons when clicked, and
  // instead, the wrapper will get focused and not through a bubbling event.
  const isKeyboardFocus = !isClickFocus

  // TODO: event.target === event.currentTarget всегда равно true
  if (isKeyboardFocus && !isTabbingBackOut.value) {
    const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS)
    event.currentTarget!.dispatchEvent(entryFocusEvent)
    emit('entryFocus', entryFocusEvent)

    if (!entryFocusEvent.defaultPrevented) {
      const items = getItems().filter(item => item.attrs.focusable)
      const activeItem = items.find(item => item.attrs.active)
      const currentItem = items.find(item => item.attrs.id === currentTabStopId.value)
      const candidateItems = [activeItem, currentItem, ...items].filter(Boolean) as typeof items
      const candidateNodes = candidateItems.map(item => item.ref)
      focusFirst(candidateNodes, props.preventScrollOnEntryFocus)
    }
  }

  isClickFocus = false
})

const onFocusout = composeEventHandlers<FocusEvent>((event) => {
  emit('focusout', event)
}, () => {
  isTabbingBackOut.value = false
})

provideRovingFocusContext({
  orientation() {
    return props.orientation
  },
  dir,
  loop() {
    return props.loop
  },
  currentTabStopId,
  onItemFocus(tabStopId) {
    currentTabStopId.value = tabStopId
  },
  onItemShiftTab() {
    isTabbingBackOut.value = true
  },
  onFocusableItemAdd() {
    focusableItemsCount.value += 1
  },
  onFocusableItemRemove() {
    focusableItemsCount.value -= 1
  },
})
</script>

<template>
  <Primitive
    :ref="forwardElement"
    :tabindex="isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0"
    :data-orientation="orientation"
    style="outline: none;"
    @mousedown="onMousedown"
    @focus="onFocus"
    @focusout="onFocusout"
  >
    <slot />
  </Primitive>
</template>
