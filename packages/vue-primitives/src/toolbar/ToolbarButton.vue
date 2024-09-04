<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { RovingFocusGroupItem } from '../roving-focus/index.ts'
import type { ToolbarButtonProps } from './ToolbarButton.ts'

defineOptions({
  name: 'ToolbarButton',
  inheritAttrs: false,
})

withDefaults(defineProps<ToolbarButtonProps>(), {
  as: 'button',
})
</script>

<template>
  <RovingFocusGroupItem
    as="template"
    :focusable="!disabled"
  >
    <Primitive
      :as="as"
      type="button"
      v-bind="$attrs"
    >
      <slot />
    </Primitive>
  </RovingFocusGroupItem>
</template>
