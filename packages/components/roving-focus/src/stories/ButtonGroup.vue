<script setup lang="ts">
import { provide, toRef } from 'vue'
import { OkuRovingFocusGroup } from '@oku-ui/roving-focus'

const { dir, value } = defineProps(['value', 'dir'])

provide('value', toRef(value))
</script>

<template>
  <OkuRovingFocusGroup :dir="dir">
    <slot />
  </OkuRovingFocusGroup>
</template>
