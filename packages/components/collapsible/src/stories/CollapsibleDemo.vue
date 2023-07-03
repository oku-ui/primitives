<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Collapsible, CollapsibleTrigger } from '../collapsible'
import type { CollapsibleProps } from '../collapsible'

export interface ICollapsibleProps extends CollapsibleProps {
  template?: '#1' | '#2' | '#3'
  allshow?: boolean
}

withDefaults(defineProps<ICollapsibleProps>(), {})
// ---
const innerRef = ref()

onMounted(() => {
  console.log('innerRef', innerRef.value.innerRef)
})
</script>

<template>
  <div class="container">
    <div>
      <Collapsible ref="innerRef">
        <CollapsibleTrigger>Trigger</CollapsibleTrigger>
      </Collapsible>
    </div>
  </div>
</template>
