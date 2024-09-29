<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
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

const rovingFocusGroupRoot = useRovingFocusGroupRoot({
  currentTabStopId: undefined,
  preventScrollOnEntryFocus: props.preventScrollOnEntryFocus,
  orientation: props.orientation,
  loop: props.loop,
  dir() {
    return props.dir
  },
  onUpdateCurrentTabStopId(tabStopId) {
    emit('update:currentTabStopId', tabStopId)
  },
  onEntryFocus(event) {
    emit('entryFocus', event)
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(rovingFocusGroupRoot.attrs(), $attrs)">
    <slot />
  </Primitive>
</template>
