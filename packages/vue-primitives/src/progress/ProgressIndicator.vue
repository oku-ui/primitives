<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { useProgressIndicator } from './ProgressIndicator.ts'

defineOptions({
  name: 'ProgressIndicator',
  inheritAttrs: false,
})

const progressIndicator = useProgressIndicator()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(progressIndicator.attrs(), $attrs)">
    <slot />
  </Primitive>
</template>
