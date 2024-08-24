<script setup lang="ts">
import { shallowRef } from 'vue'
import { type Measurable, providePopperContext } from './Popper.ts'

defineOptions({
  name: 'Popper',
})

const anchor = shallowRef<Measurable>()

providePopperContext({
  anchor,
  onAnchorChange(newAnchor: Measurable | undefined) {
    anchor.value = newAnchor
  },
})
</script>

<template>
  <slot />
</template>
