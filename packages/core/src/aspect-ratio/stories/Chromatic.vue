<script setup lang="ts">
import { AspectRatio } from '../index.ts'
import Img from './Img.vue'
import './styles.css'
</script>

<template>
  <div>
    <h1>Default ratio</h1>
    <div :style="{ width: '300px' }">
      <AspectRatio class="aspectRation__root">
        <p>Default ratio (1/1)</p>
      </AspectRatio>
    </div>

    <h1>Custom ratios</h1>
    <div :style="{ display: 'flex', gap: '20px' }">
      <div :style="{ width: '200px' }">
        <AspectRatio :ratio="1 / 2">
          <Img />
        </AspectRatio>
      </div>
      <div :style="{ width: '200px' }">
        <AspectRatio>
          <Img />
        </AspectRatio>
      </div>
      <div :style="{ width: '200px' }">
        <AspectRatio :ratio="16 / 9">
          <Img />
        </AspectRatio>
      </div>
      <div :style="{ width: '200px' }">
        <AspectRatio :ratio="2 / 1">
          <Img />
        </AspectRatio>
      </div>
    </div>
  </div>
</template>
