<script setup lang="ts">
import { normalizeAttrs } from '@oku-ui/shared'
import { useSelectLabel } from './SelectLabel'

defineOptions({
  name: 'SelectLabel',
  inheritAttrs: false,
})

const selectLabel = useSelectLabel()
</script>

<template>
  <div v-bind="normalizeAttrs(selectLabel.attrs([$attrs]))">
    <slot />
  </div>
</template>
