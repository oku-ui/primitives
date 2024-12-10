<script setup lang="ts">
import { normalizeAttrs } from '../shared'
import { useSelectViewport } from './SelectViewport'

defineOptions({
  name: 'SelectViewport',
  inheritAttrs: false,
})

const selectViewport = useSelectViewport()
</script>

<template>
  <div v-bind="normalizeAttrs(selectViewport.attrs([$attrs]))">
    <slot />
  </div>
</template>
