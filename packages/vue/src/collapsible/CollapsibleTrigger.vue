<script setup lang="ts">
import { useForwardRef } from '@oku-ui/use-composable'
import { COLLAPSIBLE_NAME, useCollapsibleInject } from './Collapsible.js'
import { TRIGGER_NAME } from './CollapsibleTrigger.ts'
import type { CollapsibleTriggerEmits, CollapsibleTriggerProps } from './CollapsibleTrigger.ts'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { getState } from './utils'

defineOptions({
  name: TRIGGER_NAME,
})

const props = defineProps<CollapsibleTriggerProps>()
const emit = defineEmits<CollapsibleTriggerEmits>()

const forwardedRef = useForwardRef()
const context = useCollapsibleInject(COLLAPSIBLE_NAME, props.scopeOkuCollapsible)

const handleClick = composeEventHandlers<MouseEvent>((e) => {
  emit('click', e)
}, context.onOpenToggle)
</script>

<template>
  <Primitive
    :is="is"
    :ref="forwardedRef"
    :type="is === 'button' ? 'button' : undefined"
    :as-child="asChild"
    :aria-controls="context.contentId"
    :aria-expanded="context.open.value || false"
    :data-state="getState(context.open.value)"
    :data-disabled="context.disabled?.value ? '' : undefined"
    :disabled="context.disabled?.value"
    @click="handleClick"
  >
    <slot />
  </Primitive>
</template>
