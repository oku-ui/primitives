<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from '../index.ts'
import './styles.css'
</script>

<template>
  <SliderRoot class="slider_rootClass" dir="rtl">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>
</template>
