<script lang="ts">

import type { PrimitiveProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'

import { composeEventHandlers } from '@oku-ui/utils'
import { CollectionItemSlot, useCollection, useRovingFocusInject } from './props'
import { focusFirst, getFocusIntent, wrapArray } from './utils'
import type { Scope } from '@oku-ui/provide'

export interface RovingFocusItemProps extends PrimitiveProps {
  scopeOkuRovingFocusGroup?: Scope
  tabStopId?: string
  focusable?: boolean
  active?: boolean
}

export type RovingFocusGroupItemEmits = {
  focus: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  mousedown: [event: MouseEvent]
}

</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useComponentRef, useId } from '@oku-ui/use-composable'

defineOptions({
  name: 'OkuRovingFocusGroupItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RovingFocusItemProps>(), {
  is: 'span',
  focusable: true,
  active: false,
})

const emits = defineEmits<RovingFocusGroupItemEmits>()
const { componentRef, currentElement } = useComponentRef<HTMLInputElement | null>()
const autoId = useId()
const id = computed(() => props.tabStopId || autoId)
const inject = useRovingFocusInject('OkuRovingFocusGroup', props.scopeOkuRovingFocusGroup)
const isCurrentTabStop = computed(() => inject.currentTabStopId.value === id.value)
const getItems = useCollection(props.scopeOkuRovingFocusGroup)

onMounted(() => {
  if (props.focusable)
    inject.onFocusableItemAdd()
})

onBeforeUnmount(() => {
  if (props.focusable)
    inject.onFocusableItemRemove()
})

defineExpose({
  $el: currentElement,
})

const keydownFunction = composeEventHandlers<KeyboardEvent>((e) => {
  emits('keydown', e)
}, (event) => {
  if (event.key === 'Tab' && event.shiftKey) {
    inject.onItemShiftTab()
    return
  }

  if (event.target !== event.currentTarget)
    return

  const focusIntent = getFocusIntent(event, inject.orientation?.value, inject.dir?.value)

  if (focusIntent !== undefined) {
    event.preventDefault()

    const items = getItems().filter(item => item.focusable)
    let candidateNodes = items.map(item => item.ref)
    if (focusIntent === 'last') {
      candidateNodes.reverse()
    }
    else if (focusIntent === 'prev' || focusIntent === 'next') {
      if (focusIntent === 'prev')
        candidateNodes.reverse()
      const currentIndex = candidateNodes.indexOf(event.currentTarget as HTMLElement)
      candidateNodes = inject.loop?.value
        ? wrapArray(candidateNodes, currentIndex + 1)
        : candidateNodes.slice(currentIndex + 1)
    }

    /**
     * Imperative focus during keydown is risky so we prevent React's batching updates
     * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
     */
    setTimeout(() => focusFirst(candidateNodes))
  }
})
</script>

<template>
  <CollectionItemSlot
    :id="id"
    :focusable="props.focusable"
    :active="props.active"
    :scope="props.scopeOkuRovingFocusGroup"
  >
    <Primitive
      :is="props.is"
      ref="componentRef"
      :as-child="props.asChild"
      v-bind="$attrs"
      :tabindex="isCurrentTabStop ? 0 : -1"
      :data-orientation="inject.orientation?.value"
      @mousedown="composeEventHandlers<MouseEvent>((e) => {
        emits('mousedown', e)
      }, (event) => {
        // We prevent focusing non-focusable items on `mousedown`.
        // Even though the item has tabIndex={-1}, that only means take it out of the tab order.
        if (!props.focusable)
          event.preventDefault()
        // Safari doesn't focus a button when clicked so we run our logic on mousedown also
        else inject.onItemFocus(id)
      })($event)"
      @focus="composeEventHandlers<FocusEvent>((e) => {
        emits('focus', e)
      }, () => {
        inject.onItemFocus(id)
      })($event)"
      @keydown="keydownFunction"
    >
      <slot />
    </Primitive>
  </CollectionItemSlot>
</template>
