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
      }"
      :width="40"
      :height="10"
    />
    <Arrow
      :style="{
        ...RECOMMENDED_CSS__ARROW__ROOT,
      }"
      :width="50"
      :height="30"
    />
    <Arrow
      :style="{
        ...RECOMMENDED_CSS__ARROW__ROOT,
      }"
      :width="20"
      :height="100"
    />
  </div>
</template>
