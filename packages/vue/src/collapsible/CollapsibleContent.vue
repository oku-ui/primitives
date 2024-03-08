<script setup lang="ts">
import { usePrimitiveElement } from '@oku-ui/use-composable'
import { OkuPresence } from '@oku-ui/presence'
import { useCollapsibleInject } from './Collapsible'
import type { CollapsibleContentProps } from './CollapsibleContent'
import CollapsibleContentImpl from './CollapsibleContentImpl.vue'
import { CONTENT_NAME } from './constants'

defineOptions({
  name: CONTENT_NAME,
})

const props = defineProps<CollapsibleContentProps>()

const [$el, set$el] = usePrimitiveElement()

const context = useCollapsibleInject(CONTENT_NAME, props.scopeOkuCollapsible)

defineExpose({
  $el,
})
</script>

<template>
  <OkuPresence :present="forceMount || context.open.value">
    <template #default="scope">
      <CollapsibleContentImpl
        :is="is"
        :ref="set$el"
        :as-child="asChild"
        :present="scope.isPresent"
        v-bind="$attrs"
      >
        <slot />
      </CollapsibleContentImpl>
    </template>
  </OkuPresence>
</template>
