<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from '../index.ts'
import './styles.css'
</script>

<template>
  <SliderRoot class="slider_rootClass" :default-value="[20]" @value-commit="console.log">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>
  <p>Check the console for the `onValueCommit` log</p>
</template>
