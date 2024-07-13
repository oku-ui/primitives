<script setup lang="ts">
import { useAttrs } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { RovingFocusGroupItem } from '../roving-focus/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { isFunction } from '../utils/is.ts'
import type { ToolbarLinkProps } from './ToolbarLink.ts'

defineOptions({
  name: 'ToolbarLink',
  inheritAttrs: false,
})

withDefaults(defineProps<ToolbarLinkProps>(), {
  as: 'a',
})
const attrs = useAttrs()

const onKeydown = composeEventHandlers((event) => {
  isFunction(attrs.onKeydown) && attrs.onKeydown(event)
}, (event: KeyboardEvent) => {
  if (event.key === ' ') {
    (event.currentTarget as HTMLElement).click()
  }
})
</script>

<template>
  <RovingFocusGroupItem
    as-child
    focusable
  >
    <Primitive
      :as="as"
      :as-child="asChild"
      type="button"
      v-bind="{
        ...attrs,
        onKeydown,
      }"
    >
      <slot />
    </Primitive>
  </RovingFocusGroupItem>
</template>
