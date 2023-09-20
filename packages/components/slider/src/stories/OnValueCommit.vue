<script setup lang="ts">
import { OkuSlider, OkuSliderRange, OkuSliderThumb, OkuSliderTrack } from '@oku-ui/slider'
</script>

<template>
  <div>
    <OkuSlider
      class="slider_rootSliderClass"
      :default-value="[20]"
      @value-commit="console.log"
    >
      <OkuSliderTrack class="slider_trackClass">
        <OkuSliderRange class="slider_rangeClass" />
      </OkuSliderTrack>
      <OkuSliderThumb class="slider_thumbClassT" />
    </OkuSlider>
  </div>
</template>
