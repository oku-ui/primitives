<script setup lang="ts">
import { Arrow } from '../index.ts'

const RECOMMENDED_CSS__ARROW__ROOT = {
  // better default alignment
  verticalAlign: 'middle',
}
</script>

<template>
  <div>
    <Arrow
      :style="{
        ...RECOMMENDED_CSS__ARROW__ROOT,
        fill: 'crimson',
      }"
      :width="20"
      :height="10"
    />
  </div>
</template>
