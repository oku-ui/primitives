<script setup lang="ts">
import { useForwardElement, useRef } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { useRovingFocusGroupRoot } from '../roving-focus/index.ts'
import { useTabsContext } from './TabsRoot.ts'
import type { TabsListEmits, TabsListProps } from './TabsList.ts'

defineOptions({
  name: 'TabsList',
})

const props = withDefaults(defineProps<TabsListProps>(), {
  loop: true,
})
const emit = defineEmits<TabsListEmits>()
const elRef = useRef<HTMLElement>()
const forwardElement = useForwardElement(elRef)

const context = useTabsContext('TabsList')

const rovingFocusGroupRoot = useRovingFocusGroupRoot(elRef, {
  currentTabStopId() {
    return undefined
  },
  orientation() {
    return context.orientation
  },
  loop() {
    return props.loop
  },
  dir: context.dir,
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
})
</script>

<template>
  <Primitive
    :ref="forwardElement"

    :dir="context.dir.value"
    :tabindex="rovingFocusGroupRoot.tabindex()"
    :data-orientation="context.orientation"
    style="outline: none;"

    role="tablist"
    :aria-orientation="context.orientation"

    @mousedown="rovingFocusGroupRoot.onMousedown"
    @focus="rovingFocusGroupRoot.onFocus"
    @focusout="rovingFocusGroupRoot.onFocusout"
  >
    <slot />
  </Primitive>
</template>
