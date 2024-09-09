<script setup lang="ts">
import { useDirection } from '../direction/index.ts'
import { useForwardElement, useRef } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { useRovingFocusGroupRoot } from '../roving-focus/index.ts'
import { provideToolbarContext, type ToolbarRootEmits, type ToolbarRootProps } from './ToolbarRoot.ts'

defineOptions({
  name: 'ToolbarRoot',
})

const props = withDefaults(defineProps<ToolbarRootProps>(), {
  orientation: 'horizontal',
  loop: true,
})

const emit = defineEmits<ToolbarRootEmits>()
const elRef = useRef<HTMLElement>()
const forwardElement = useForwardElement(elRef)

const direction = useDirection(() => props.dir)

provideToolbarContext({
  orientation() {
    return props.orientation
  },
  dir: direction,
})

const rovingFocusGroupRoot = useRovingFocusGroupRoot(elRef, {
  currentTabStopId() {
    return undefined
  },
  orientation() {
    return props.orientation
  },
  loop() {
    return props.loop
  },
  dir: direction,
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
    role="toolbar"
    :aria-orientation="orientation"

    :dir="direction"
    :tabindex="rovingFocusGroupRoot.tabindex()"
    :data-orientation="orientation"
    style="outline: none;"

    @mousedown="rovingFocusGroupRoot.onMousedown"
    @focus="rovingFocusGroupRoot.onFocus"
    @focusout="rovingFocusGroupRoot.onFocusout"
  >
    <slot />
  </Primitive>
</template>
