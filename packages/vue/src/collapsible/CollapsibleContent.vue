<script setup lang="ts">
import { useForwardRef } from '@oku-ui/use-composable'
import { useCollapsibleInject } from './Collapsible.js'
import type { CollapsibleContentProps } from './CollapsibleContent.ts'
import { OkuPresence } from '@oku-ui/presence'
import CollapsibleContentImpl from './CollapsibleContentImpl.vue'
import { CONTENT_NAME } from './constants.js'

defineOptions({
  name: CONTENT_NAME,
})

const props = defineProps<CollapsibleContentProps>()

const forwardedRef = useForwardRef()
const context = useCollapsibleInject(CONTENT_NAME, props.scopeOkuCollapsible)
</script>

<template>
  <OkuPresence :present="forceMount || context.open.value">
    <template #default="scope">
      <CollapsibleContentImpl v-bind="$attrs" :ref="forwardedRef" :present="scope.isPresent" />
    </template>
  </OkuPresence>
</template>
