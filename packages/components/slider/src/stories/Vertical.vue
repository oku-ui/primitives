<script setup lang="ts">
import { OkuSlider, OkuSliderRange, OkuSliderThumb, OkuSliderTrack } from '@oku-ui/slider'
import { ref } from 'vue'

const test = ref()
</script>

<template>
  <div class="flex gap-14">
    <OkuSlider
      class="slider-rootSliderClass"
      orientation="vertical"
    >
      <OkuSliderTrack class="slider-trackClass">
        <OkuSliderRange class="slider-rangeClass" />
      </OkuSliderTrack>
      <OkuSliderThumb class="slider-thumbClassT" />
    </OkuSlider>

    <OkuSlider
      :default-value="[10, 50]"
      class="slider-rootSliderClass"
      orientation="vertical"
    >
      <OkuSliderTrack class="slider-trackClass">
        <OkuSliderRange class="slider-rangeClass" />
      </OkuSliderTrack>
      <OkuSliderThumb class="slider-thumbClassT" />
      <OkuSliderThumb class="slider-thumbClassT" />
    </OkuSlider>

    <OkuSlider
      v-model="test"
      :default-value="[10, 50]"
      class="slider-rootSliderClass"
      orientation="vertical"
    >
      <OkuSliderTrack class="slider-trackClass">
        <OkuSliderRange class="slider-rangeClass" />
      </OkuSliderTrack>
      <OkuSliderThumb class="slider-thumbClassT" />
      <OkuSliderThumb class="slider-thumbClassT" />
    </OkuSlider>
    {{ test }}
  </div>
</template>
