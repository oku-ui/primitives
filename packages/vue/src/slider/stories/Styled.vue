<script setup lang="ts">
import { OkuSlider, OkuSliderRange, OkuSliderThumb, OkuSliderTrack } from '@oku-ui/slider'
</script>

<template>
  <div>
    <OkuSlider class="slider-rootSlider">
      <OkuSliderTrack class="slider-track">
        <OkuSliderRange class="slider-range" />
      </OkuSliderTrack>
      <OkuSliderThumb class="slider-thumb" />
    </OkuSlider>
  </div>
</template>
