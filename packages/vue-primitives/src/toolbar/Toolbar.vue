<script setup lang="ts">
import { useDirection } from '../direction/index.ts'
import { Primitive } from '../primitive/index.ts'
import { RovingFocusGroup } from '../roving-focus/index.ts'
import { type ToolbarProps, provideToolbarContext } from './Toolbar.ts'

defineOptions({
  name: 'Toolbar',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToolbarProps>(), {
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
  <RovingFocusGroup
    as-child
    :orientation="orientation"
    :dir="direction"
    :loop="loop"
  >
    <Primitive
      :as="as"
      :as-child="asChild"
      role="toolbar"
      :aria-orientation="orientation"
      :dir="direction"
      v-bind="$attrs"
    >
      <slot />
    </Primitive>
  </RovingFocusGroup>
</template>
