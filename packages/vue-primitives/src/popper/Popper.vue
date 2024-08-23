<script setup lang="ts">
import { shallowRef } from 'vue'
import { type Measurable, providePopperContext } from './Popper.ts'

defineOptions({
  name: 'Popper',
})

const anchor = shallowRef<Measurable>()

providePopperContext({
  anchor,
  onAnchorChange(value: Measurable | undefined) {
    anchor.value = value
  },
})
</script>

<template>
  <slot />
</template>
