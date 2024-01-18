<script lang="ts">
import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted, ref, toRef } from 'vue'
import { useComponentRef, useVModel } from '@oku-ui/use-composable'

import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { focusFirst } from './utils'
import type { RovingFocusGroupProps } from './props'
import { ENTRY_FOCUS, EVENT_OPTIONS, rovingFocusProvider, useCollection } from './props'

export interface RovingFocusGroupImplProps extends RovingFocusGroupProps {
  currentTabStopId?: string | null
  defaultCurrentTabStopId?: string
}

export type RovingFocusGroupImplEmits = {
  currentTabStopIdChange: [tabStopId: string | null]
  'update:currentTabStopId': [tabStopId: string | null]
  entryFocus: [event: Event]
  mousedown: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}

</script>

<script setup lang="ts">

defineOptions({
  name: 'OkuRovingFocusGroupImpl',
})

const props = withDefaults(defineProps<RovingFocusGroupImplProps>(), {
  orientation: undefined,
  dir: undefined,
  loop: false,
  defaultCurrentTabStopId: undefined,
})

const emits = defineEmits<RovingFocusGroupImplEmits>()

const { componentRef, currentElement } = useComponentRef<HTMLDivElement | null>()

const currentTabStopIdValue = useVModel(props, 'currentTabStopId', emits, {
  defaultValue: props.defaultCurrentTabStopId,
  passive: (props.currentTabStopId === undefined) as false,
  shouldEmit(v: any) {
    emits('currentTabStopIdChange', v)
    return true
  },
}) as Ref<string | null>

const getItems = useCollection(props.scopeOkuRovingFocusGroup)

const isTabbingBackOut = ref(false)
const isClickFocusRef = ref(false)
const focusableItemsCount = ref(0)

onMounted(() => {
  const node = currentElement.value
  if (node) {
    node.addEventListener(ENTRY_FOCUS, (event) => {
      emits('entryFocus', event)
    })
  }
})

onBeforeUnmount(() => {
  const node = currentElement.value
  if (node) {
    node.removeEventListener(ENTRY_FOCUS, (event) => {
      emits('entryFocus', event)
    })
  }
})

rovingFocusProvider({
  scope: props.scopeOkuRovingFocusGroup,
  orientation: toRef(props, 'orientation'),
  dir: toRef(props, 'dir'),
  loop: toRef(props, 'loop'),
  currentTabStopId: currentTabStopIdValue,
  onItemFocus: (tabStopIdValue: string) => {
    currentTabStopIdValue.value = tabStopIdValue
  },
  onItemShiftTab: () => {
    isTabbingBackOut.value = true
  },
  onFocusableItemAdd: () => {
    focusableItemsCount.value++
  },
  onFocusableItemRemove: () => {
    focusableItemsCount.value--
  },
})

const focus = composeEventHandlers<FocusEvent>((e) => {
  emits('focus', e)
}, (event: FocusEvent) => {
  // We normally wouldn't need this check, because we already check
  // that the focus is on the current target and not bubbling to it.
  // We do this because Safari doesn't focus buttons when clicked, and
  // instead, the wrapper will get focused and not through a bubbling event.
  const isKeyboardFocus = !isClickFocusRef.value

  if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut.value) {
    const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS)
    event.currentTarget?.dispatchEvent(entryFocusEvent)
    if (!entryFocusEvent.defaultPrevented) {
      const items = getItems().filter(item => item.focusable)
      const activeItem = items.find(item => item.active)
      const currentItem = items.find(item => item.id === props.currentTabStopId)
      const candidateItems = [activeItem, currentItem, ...items].filter(
        Boolean,
      ) as typeof items
      const candidateNodes = candidateItems.map(item => item.ref.value.$el)
      focusFirst(candidateNodes)
    }
  }
  console.log('focus')
  isClickFocusRef.value = false
})

defineExpose({
  $el: currentElement,
})

</script>

<template>
  <Primitive
    :is="props.is"
    ref="componentRef"
    :tabindex="isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0"
    :data-orientation="props.orientation"
    :as-child="props.asChild"
    :style="{
      outline: 'none',
    }"
    @mousedown="composeEventHandlers<MouseEvent>((e) => {
      emits('mousedown', e)
    }, () => {
      console.log('asdasdasd')
      isClickFocusRef = true
    })"
    @focus="focus"
    @blur="composeEventHandlers<FocusEvent>((e) => {
      emits('blur', e)
    }, () => {
      isTabbingBackOut = false
    })"
  >
    <slot />
  </Primitive>
</template>
