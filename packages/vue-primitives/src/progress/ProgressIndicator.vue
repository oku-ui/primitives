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
    :data-state="getProgressState(context.value(), context.max())"
    :data-value="context.value() ?? undefined"
    :data-max="context.max()"
  >
    <slot />
  </Primitive>
</template>
