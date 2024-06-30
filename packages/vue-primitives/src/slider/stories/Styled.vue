<script setup lang="ts">
import { Slider, SliderRange, SliderThumb, SliderTrack } from '../index.ts'
import './styles.css'
</script>

<template>
  <Slider class="slider_rootClass">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </Slider>
</template>
