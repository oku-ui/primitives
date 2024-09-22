<script setup lang="ts">
import { useForwardElement, useRef } from '@oku-ui/hooks'
import { Primitive } from '@oku-ui/primitive'
import { useDirection } from '../direction/index.ts'
import { useForwardElement, useRef } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/mergeProps.ts'
import { type RovingFocusGroupRootEmits, type RovingFocusGroupRootProps, useRovingFocusGroupRoot } from './RovingFocusGroupRoot.ts'

defineOptions({
  name: 'RovingFocusGroupRoot',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<RovingFocusGroupRootProps>(), {
  loop: false,
  preventScrollOnEntryFocus: false,
})
const emit = defineEmits<RovingFocusGroupRootEmits>()
const elRef = useRef<HTMLElement>()
const forwardElement = useForwardElement(elRef)

const dir = useDirection(() => props.dir)

const rovingFocusGroupRoot = useRovingFocusGroupRoot({
  elRef,
  currentTabStopId: undefined,
  preventScrollOnEntryFocus: props.preventScrollOnEntryFocus,
  orientation: props.orientation,
  loop() {
    return props.loop
  },
  dir,
  onUpdateCurrentTabStopId(tabStopId) {
    emit('update:currentTabStopId', tabStopId)
  },
  onEntryFocus(event) {
    emit('entryFocus', event)
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(rovingFocusGroupRoot.attrs(), $attrs, { ref: forwardElement })">
    <slot />
  </Primitive>
</template>
