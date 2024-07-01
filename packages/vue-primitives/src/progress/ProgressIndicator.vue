<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { getProgressState, useProgressContext } from './Progress.ts'
import type { ProgressIndicatorProps } from './ProgressIndicator.ts'

defineOptions({
  name: 'ProgressIndicator',
})

defineProps<ProgressIndicatorProps>()

const context = useProgressContext()
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :data-state="getProgressState(context.value.value, context.max.value)"
    :data-value="context.value.value ?? undefined"
    :data-max="context.max.value"
  >
    <slot />
  </Primitive>
</template>
