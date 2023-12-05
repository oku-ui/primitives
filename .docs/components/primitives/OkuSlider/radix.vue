<script setup lang="ts">
import {
  OkuSlider,
  OkuSliderRange,
  OkuSliderThumb,
  OkuSliderTrack,
} from '@oku-ui/slider'
import { ref } from 'vue'

const value = ref([50])
</script>

<template>
  <form>
    <OkuSlider
      v-model="value"
      class="relative flex items-center select-none touch-none w-[200px] h-5"
      :max="100"
      :step="1"
    >
      <OkuSliderTrack class="bg-blackA10 relative grow rounded-full h-[3px]">
        <OkuSliderRange class="absolute bg-white rounded-full h-full" />
      </OkuSliderTrack>
      <OkuSliderThumb
        class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        aria-label="Volume"
      />
    </OkuSlider>
  </form>
</template>
