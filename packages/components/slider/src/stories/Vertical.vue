<script setup lang="ts">
import { OkuSlider, OkuSliderRange, OkuSliderThumb, OkuSliderTrack } from '@oku-ui/slider'
import { ref } from 'vue'

const test = ref()
</script>

<template>
  <div class="flex gap-14">
    <OkuSlider
      class="slider-rootSlider"
      orientation="vertical"
    >
      <OkuSliderTrack class="slider-track">
        <OkuSliderRange class="slider-range" />
      </OkuSliderTrack>
      <OkuSliderThumb class="slider-thumb" />
    </OkuSlider>

    <OkuSlider
      :default-value="[10, 50]"
      class="slider-rootSlider"
      orientation="vertical"
    >
      <OkuSliderTrack class="slider-track">
        <OkuSliderRange class="slider-range" />
      </OkuSliderTrack>
      <OkuSliderThumb class="slider-thumb" />
      <OkuSliderThumb class="slider-thumb" />
    </OkuSlider>

    <OkuSlider
      v-model="test"
      :default-value="[10, 50]"
      class="slider-rootSlider"
      orientation="vertical"
    >
      <OkuSliderTrack class="slider-track">
        <OkuSliderRange class="slider-range" />
      </OkuSliderTrack>
      <OkuSliderThumb class="slider-thumb" />
      <OkuSliderThumb class="slider-thumb" />
    </OkuSlider>
    {{ test }}
  </div>
</template>
