<script setup lang="ts">
import { useForwardRef } from '@oku-ui/use-composable'
import { COLLAPSIBLE_NAME, useCollapsibleInject } from './Collapsible.js'
import { TRIGGER_NAME } from './CollapsibleTrigger.ts'
import type { CollapsibleContentProps } from './CollapsibleContent.ts'
import { OkuPresence } from '@oku-ui/presence'
import CollapsibleContentImpl from './CollapsibleContentImpl.vue'

defineOptions({
  name: TRIGGER_NAME,
})

const props = defineProps<CollapsibleContentProps>()

const forwardedRef = useForwardRef()
const context = useCollapsibleInject(COLLAPSIBLE_NAME, props.scopeOkuCollapsible)
</script>

<template>
  <OkuPresence :present="forceMount || context.open.value">
    <template #default="scope">
      <CollapsibleContentImpl v-bind="$attrs" :ref="forwardedRef" :present="scope.isPresent" />
    </template>
  </OkuPresence>
</template>
