<script setup lang="ts">
import { shallowRef } from 'vue'
import { Slider, SliderRange, SliderThumb, SliderTrack } from '../index.ts'
import './styles.css'

const value = shallowRef([0.1])
</script>

<template>
  <Slider
    v-model:value="value"
    class="slider_rootClass"
    :min="0.1"
    :max="0.2"
    :step="0.003"
  >
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
  </Slider>
  <div>{{ value }}</div>
</template>
