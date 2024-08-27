<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { getProgressState, useProgressContext } from './ProgressRoot.ts'

defineOptions({
  name: 'ProgressIndicator',
})

const context = useProgressContext('ProgressIndicator')
</script>

<template>
  <Primitive
    :data-state="getProgressState(context.value(), context.max())"
    :data-value="context.value() ?? undefined"
    :data-max="context.max()"
  >
    <slot />
  </Primitive>
</template>
