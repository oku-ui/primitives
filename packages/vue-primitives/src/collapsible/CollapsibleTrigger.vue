<script setup lang="ts">
import { useAttrs } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { isFunction } from '../utils/is.ts'
import type { CollapsibleTriggerProps } from './CollapsibleTrigger.ts'
import { useCollapsibleContext } from './Collapsible.ts'
import { getState } from './utils.ts'

defineOptions({
  name: 'CollapsibleTrigger',
  inheritAttrs: false,
})

withDefaults(defineProps<CollapsibleTriggerProps>(), {
  as: 'button',
})
const attrs = useAttrs()

const context = useCollapsibleContext()

const onClick = composeEventHandlers((event) => {
  isFunction(attrs.onClick) && attrs.onClick(event)
}, context.onOpenToggle)
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    type="button"
    :aria-controls="context.contentId"
    :aria-expanded="context.open.value || false"
    :data-state="getState(context.open.value)"
    :data-disabled="context.disabled() ? '' : undefined"
    :disabled="context.disabled()"
    v-bind="{
      ...attrs,
      onClick,
    }"
  >
    <slot />
  </Primitive>
</template>
