<script setup lang="ts">
import { useCollapsibleInject } from './Collapsible.ts'
import { TRIGGER_NAME } from './constants.ts'
import type { CollapsibleTriggerEmits, CollapsibleTriggerProps } from './CollapsibleTrigger.ts'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { getState } from './utils'
import { usePrimitiveElement } from '@oku-ui/use-composable'

defineOptions({
  name: TRIGGER_NAME,
})

const props = defineProps<CollapsibleTriggerProps>()
const emit = defineEmits<CollapsibleTriggerEmits>()

const [$el, set$el] = usePrimitiveElement()
const context = useCollapsibleInject(TRIGGER_NAME, props.scopeOkuCollapsible)

const handleClick = composeEventHandlers<MouseEvent>((e) => {
  emit('click', e)
}, context.onOpenToggle)

defineExpose({
  $el,
})
</script>

<template>
  <Primitive
    :is="is"
    :ref="set$el"
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
