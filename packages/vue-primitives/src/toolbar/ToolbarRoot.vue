<script setup lang="ts">
import { useDirection } from '../direction/index.ts'
import { Primitive } from '../primitive/index.ts'
import { RovingFocusGroupRoot } from '../roving-focus/index.ts'
import { type ToolbarRootProps, provideToolbarContext } from './ToolbarRoot.ts'

defineOptions({
  name: 'ToolbarRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToolbarRootProps>(), {
  orientation: 'horizontal',
  loop: true,
})

const direction = useDirection(() => props.dir)

provideToolbarContext({
  orientation() {
    return props.orientation
  },
  dir: direction,
})
</script>

<template>
  <RovingFocusGroupRoot
    as="template"
    :orientation="orientation"
    :dir="direction"
    :loop="loop"
  >
    <Primitive
      role="toolbar"
      :aria-orientation="orientation"
      :dir="direction"
      v-bind="$attrs"
    >
      <slot />
    </Primitive>
  </RovingFocusGroupRoot>
</template>
