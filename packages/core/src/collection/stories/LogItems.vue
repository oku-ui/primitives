<script setup lang="ts">
import { watchEffect } from 'vue'
import { useCollection } from './utils.ts'

const props = defineProps({
  name: { type: String, default: 'items' },
})

const getItems = useCollection()

watchEffect(() => {
  console.warn(`${props.name}`, getItems())
})
</script>

<template>
  <slot />
</template>
