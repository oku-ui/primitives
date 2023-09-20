<script setup lang="ts">
import { OkuSlider, OkuSliderRange, OkuSliderThumb, OkuSliderTrack } from '@oku-ui/slider'
</script>

<template>
  <div>
    <OkuSlider class="slider-rootSliderClass">
      <OkuSliderTrack class="slider-trackClass">
        <OkuSliderRange class="slider-rangeClass" />
      </OkuSliderTrack>
      <OkuSliderThumb class="slider-thumbClassT" />
    </OkuSlider>
  </div>
</template>
