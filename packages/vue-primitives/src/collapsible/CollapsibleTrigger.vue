<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useCollapsibleContext } from './CollapsibleRoot.ts'
import { getState } from './utils.ts'
import type { CollapsibleTriggerEmits, CollapsibleTriggerProps } from './CollapsibleTrigger.ts'

defineOptions({
  name: 'CollapsibleTrigger',
})

withDefaults(defineProps<CollapsibleTriggerProps>(), {
  as: 'button',
})
const emit = defineEmits<CollapsibleTriggerEmits>()

const context = useCollapsibleContext('CollapsibleTrigger')

const onClick = composeEventHandlers<MouseEvent>((event) => {
  emit('click', event)
}, context.onOpenToggle)
</script>

<template>
  <Primitive
    :as="as"
    type="button"
    :aria-controls="context.contentId"
    :aria-expanded="context.open.value || false"
    :data-state="getState(context.open.value)"
    :data-disabled="context.disabled() ? '' : undefined"
    :disabled="context.disabled()"
    @click="onClick"
  >
    <slot />
  </Primitive>
</template>
