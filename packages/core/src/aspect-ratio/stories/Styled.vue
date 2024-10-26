<script setup lang="ts">
import { AspectRatio } from '../index.ts'
import './styles.css'
</script>

<template>
  <div :style="{ width: '500px' }">
    <AspectRatio class="aspectRation__root">
      <h1>Default ratio (1/1)</h1>
    </AspectRatio>
  </div>
</template>
