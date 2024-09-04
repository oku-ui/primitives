<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { RovingFocusGroupItem } from '../roving-focus/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import type { ToolbarLinkEmits, ToolbarLinkProps } from './ToolbarLink.ts'

defineOptions({
  name: 'ToolbarLink',
  inheritAttrs: false,
})

withDefaults(defineProps<ToolbarLinkProps>(), {
  as: 'a',
})
const emit = defineEmits<ToolbarLinkEmits>()

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  emit('keydown', event)
}, (event: KeyboardEvent) => {
  if (event.key === ' ') {
    (event.currentTarget as HTMLElement).click()
  }
})
</script>

<template>
  <RovingFocusGroupItem
    as="template"
    focusable
  >
    <Primitive
      :as="as"
      type="button"
      v-bind="$attrs"
      @keydown="onKeydown"
    >
      <slot />
    </Primitive>
  </RovingFocusGroupItem>
</template>
