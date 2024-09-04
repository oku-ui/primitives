<script setup lang="ts">
import { computed, onWatcherCleanup, shallowRef, watch, watchEffect } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { useForwardElement, useId } from '../hooks/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { ITEM_DATA_ATTR } from '../collection/Collection.ts'
import { focusFirst, getFocusIntent, wrapArray } from './utils.ts'
import { Collection, type ItemData, useCollection, useRovingFocusContext } from './RovingFocusGroupRoot.ts'
import type { RovingFocusGroupItemEmits, RovingFocusGroupItemProps } from './RovingFocusGroupItem.ts'

defineOptions({
  name: 'RovingFocusGroupItem',
})

const props = withDefaults(defineProps<RovingFocusGroupItemProps>(), {
  focusable: true,
  active: true,
  as: 'span',
})
const emit = defineEmits<RovingFocusGroupItemEmits>()
const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const id = computed(() => props.tabStopId || useId())
const context = useRovingFocusContext('RovingFocusGroupItem')
const isCurrentTabStop = computed(() => context.currentTabStopId.value === id.value)

const getItems = useCollection()

const { onFocusableItemAdd, onFocusableItemRemove } = context

watch(() => props.focusable, (value) => {
  if (value) {
    onFocusableItemAdd()
    onWatcherCleanup(onFocusableItemRemove)
  }
}, { immediate: true })

const itemData: ItemData = { id: id.value, focusable: props.focusable, active: props.active }
watchEffect(() => {
  itemData.active = props.active
  itemData.focusable = props.focusable
  itemData.id = id.value
})
Collection.useCollectionItem($el, itemData)

const onMousedown = composeEventHandlers<MouseEvent>((event) => {
  emit('mousedown', event)
}, (event) => {
  // We prevent focusing non-focusable items on `mousedown`.
  // Even though the item has tabIndex={-1}, that only means take it out of the tab order.
  if (!props.focusable)
    event.preventDefault()
  // Safari doesn't focus a button when clicked so we run our logic on mousedown also
  else context.onItemFocus(id.value)
})

const onFocus = composeEventHandlers<FocusEvent>((event) => {
  emit('focus', event)
}, () => context.onItemFocus(id.value))

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  emit('keydown', event)
}, (event) => {
  if (event.key === 'Tab' && event.shiftKey) {
    context.onItemShiftTab()
    return
  }

  if (event.target !== event.currentTarget)
    return

  if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
    return

  const focusIntent = getFocusIntent(event, context.orientation(), context.dir.value)

  if (!focusIntent)
    return

  event.preventDefault()
  const items = getItems().filter(item => item.attrs.focusable)
  let candidateNodes = items.map(item => item.ref)

  if (focusIntent === 'last') {
    candidateNodes.reverse()
  }
  else if (focusIntent === 'prev' || focusIntent === 'next') {
    if (focusIntent === 'prev')
      candidateNodes.reverse()
    const currentIndex = candidateNodes.indexOf(event.currentTarget as HTMLElement)
    candidateNodes = context.loop()
      ? wrapArray(candidateNodes, currentIndex + 1)
      : candidateNodes.slice(currentIndex + 1)
  }

  // TODO: wip
  /**
   * Imperative focus during keydown is risky so we prevent React's batching updates
   * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
   */
  setTimeout(() => focusFirst(candidateNodes))
})
</script>

<template>
  <Primitive
    :ref="forwardElement"
    :as="as"
    :tabindex="isCurrentTabStop ? 0 : -1"
    :data-orientation="context.orientation()"
    :[ITEM_DATA_ATTR]="true"
    @mousedown="onMousedown"
    @focus="onFocus"
    @keydown="onKeydown"
  >
    <slot />
  </Primitive>
</template>
