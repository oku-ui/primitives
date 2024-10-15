<script setup lang="ts">
import { OkuSlider, OkuSliderRange, OkuSliderThumb, OkuSliderTrack } from '@oku-ui/slider'
</script>

<template>
  <div class="flex items-center justify-center">
    <form>
      <OkuSlider
        class="relative flex items-center select-none touch-none w-[200px] h-5"
        :default-value="[50]"
        :max="100"
        :step="1"
      >
        <OkuSliderTrack class="bg-codGray-300 dark:bg-codGray-900 relative grow rounded-full h-2">
          <OkuSliderRange class="absolute bg-oku-500 rounded-full h-full" />
        </OkuSliderTrack>
        <OkuSliderThumb
          class="block w-4 h-4 bg-white shadow-[0_2px_10px] shadow-codGray-500 rounded-[10px] hover:bg-grayOA-200 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-oku-500"
          aria-label="Volume"
        />
      </OkuSlider>
    </form>
  </div>
</template>
