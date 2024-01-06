<script setup lang="ts">
import { provide, toRef } from 'vue'
import { OkuRovingFocusGroup } from '@oku-ui/roving-focus'

const { dir, value, orientation } = defineProps(['value', 'dir', 'orientation'])

provide('value', toRef(value))
</script>

<template>
  <OkuRovingFocusGroup
    :dir="dir" :style="{
      display: 'inline-flex',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      gap: '10',
    }"
  >
    <slot />
  </OkuRovingFocusGroup>
</template>
