<script setup lang="ts">
import { useDirection } from '../direction/index.ts'
import { useForwardElement, useRef } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { type RovingFocusGroupRootEmits, type RovingFocusGroupRootProps, useRovingFocusGroupRoot } from './RovingFocusGroupRoot.ts'

defineOptions({
  name: 'RovingFocusGroupRoot',
})
const props = withDefaults(defineProps<RovingFocusGroupRootProps>(), {
  loop: false,
  preventScrollOnEntryFocus: false,
})
const emit = defineEmits<RovingFocusGroupRootEmits>()
const elRef = useRef<HTMLElement>()
const forwardElement = useForwardElement(elRef)

const dir = useDirection(() => props.dir)

const rovingFocusGroupRoot = useRovingFocusGroupRoot(elRef, {
  currentTabStopId() {
    return props.currentTabStopId
  },
  preventScrollOnEntryFocus: props.preventScrollOnEntryFocus,
  orientation() {
    return props.orientation
  },
  loop() {
    return props.loop
  },
  dir,
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
    emit('update:currentTabStopId', tabStopId)
  },
  entryFocus(event: CustomEvent) {
    emit('entryFocus', event)
  },
})
</script>

<template>
  <Primitive
    :ref="forwardElement"
    :tabindex="rovingFocusGroupRoot.tabindex()"
    :data-orientation="orientation"
    :dir="dir"
    style="outline: none;"
    @mousedown="rovingFocusGroupRoot.onMousedown"
    @focus="rovingFocusGroupRoot.onFocus"
    @focusout="rovingFocusGroupRoot.onFocusout"
  >
    <slot />
  </Primitive>
</template>
