<script setup lang="ts">
import { useAttrs } from 'vue'
import Primitive from '../primitive/Primitive.vue'
import { composeEventHandlers } from '../utils/vue.ts'
import { isFunction } from '../utils/is.ts'
import { usePopoverContext } from './Popover.ts'
import type { PopoverCloseProps } from './PopoverClose.ts'

defineOptions({
  name: 'PopoverClose',
  inheritAttrs: false,
})

withDefaults(defineProps<PopoverCloseProps>(), {
  as: 'button',
})
const attrs = useAttrs()

const context = usePopoverContext('PopoverClose')

const onClick = composeEventHandlers((event) => {
  if (isFunction(attrs.onClick))
    attrs.onClick(event)
}, () => {
  context.onOpenChange(false)
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    type="button"
    v-bind="{
      ...attrs,
      onClick,
    }"
  >
    <slot />
  </Primitive>
</template>
