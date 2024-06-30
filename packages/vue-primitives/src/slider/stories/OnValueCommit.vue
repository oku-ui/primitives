<script setup lang="ts">
import { Slider, SliderRange, SliderThumb, SliderTrack } from '../index.ts'
import './styles.css'
</script>

<template>
  <Slider class="slider_rootClass" :default-value="[20]" @value-commit="console.log">
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </Slider>
  <p>Check the console for the `onValueCommit` log</p>
</template>
