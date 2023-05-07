<!-- eslint-disable no-console -->
<script setup lang="ts">
// @ts-nocheck
import type { AspectRatioProps } from '@oku-ui/aspect-ratio'

export interface IAspectRatioProps extends AspectRatioProps {
  template: '#1' | '#2'
  imageurl: string
}

withDefaults(defineProps<IAspectRatioProps>(), {
  ratio: 16 / 9,
})
</script>

<template>
  <div class="cursor-default inline-block">
    <div v-if="template === '#1'" class="flex flex-col">
      <OkuAspectRatio :ratio="ratio">
        <img
          class="object-cover w-full h-full rounded-lg"
          :src="imageurl"
          alt="Landscape photograph by Tobias Tullius"
        >
      </OkuAspectRatio>
    </div>
  </div>
</template>
