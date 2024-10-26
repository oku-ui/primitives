<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from '../index.ts'
import './styles.css'
</script>

<template>
  <div :style="{ display: 'flex', gap: '50px' }">
    <SliderRoot
      class="slider_rootClass"
      :default-value="[10, 30]"
      orientation="vertical"
    >
      <SliderTrack class="slider_trackClass">
        <SliderRange class="slider_rangeClass" />
      </SliderTrack>
      <SliderThumb class="slider_thumbClass" />
      <SliderThumb class="slider_thumbClass" />
    </SliderRoot>

    <SliderRoot class="slider_rootClass" :default-value="[10]" orientation="vertical">
      <SliderTrack class="slider_trackClass">
        <SliderRange class="slider_rangeClass" />
      </SliderTrack>
      <SliderThumb class="slider_thumbClass" />
    </SliderRoot>
  </div>
</template>
