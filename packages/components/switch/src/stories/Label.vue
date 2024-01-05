<script setup lang="ts">
import { OkuLabel } from '@oku-ui/label'
</script>

<template>
  <OkuLabel v-bind="$attrs" :style="{ verticalAlign: 'middle' }">
    <slot />
  </OkuLabel>
</template>
