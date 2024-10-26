<script setup lang="ts">
import { shallowRef } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from '../index.ts'
import './styles.css'

const minStepsBetweenThumbs = shallowRef(0)
</script>

<template>
  <label>
    Minimum steps between thumbs:{{ ' ' }}
    <input
      type="number"
      :value="minStepsBetweenThumbs"
      :style="{ width: 30 }"
      @change="(event) => minStepsBetweenThumbs = Number((event.target as HTMLInputElement).value)"
    >
  </label>

  <br>
  <br>

  <SliderRoot
    class="slider_rootClass"
    :default-value="[10, 15, 20, 80]"
    :min-steps-between-thumbs="minStepsBetweenThumbs"
  >
    <SliderTrack class="slider_trackClass">
      <SliderRange class="slider_rangeClass" />
    </SliderTrack>
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
    <SliderThumb class="slider_thumbClass" />
  </SliderRoot>
</template>
