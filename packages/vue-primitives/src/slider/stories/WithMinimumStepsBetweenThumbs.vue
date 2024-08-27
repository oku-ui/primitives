<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from '../index.ts'
import './styles.css'
</script>

<template>
  <SliderRoot class="slider_rootClass" :default-value="[10, 30]" :min-steps-between-thumbs="3">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>
</template>
