<script setup lang="ts">
import { OkuSlider, OkuSliderRange, OkuSliderThumb, OkuSliderTrack } from '@oku-ui/slider'
import { ref } from 'vue'

const test = ref()
</script>

<template>
  <div class="flex gap-14">
    <OkuSlider
      class="slider_rootSliderClass"
      orientation="vertical"
    >
      <OkuSliderTrack class="slider_trackClass">
        <OkuSliderRange class="slider_rangeClass" />
      </OkuSliderTrack>
      <OkuSliderThumb class="slider_thumbClassT" />
    </OkuSlider>

    <OkuSlider
      :default-value="[10, 50]"
      class="slider_rootSliderClass"
      orientation="vertical"
    >
      <OkuSliderTrack class="slider_trackClass">
        <OkuSliderRange class="slider_rangeClass" />
      </OkuSliderTrack>
      <OkuSliderThumb class="slider_thumbClassT" />
      <OkuSliderThumb class="slider_thumbClassT" />
    </OkuSlider>

    <OkuSlider
      v-model="test"
      :default-value="[10, 50]"
      class="slider_rootSliderClass"
      orientation="vertical"
    >
      <OkuSliderTrack class="slider_trackClass">
        <OkuSliderRange class="slider_rangeClass" />
      </OkuSliderTrack>
      <OkuSliderThumb class="slider_thumbClassT" />
      <OkuSliderThumb class="slider_thumbClassT" />
    </OkuSlider>
    {{ test }}
  </div>
</template>
