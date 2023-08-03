<script setup lang="ts">
import type { AspectRatioProps, InstanceAspectRatioType } from '@oku-ui/aspect-ratio'
import { OkuAspectRatio } from '@oku-ui/aspect-ratio'
import { onMounted, ref } from 'vue'

export interface IAspectRatioProps extends AspectRatioProps {
  template?: '#1' | '#2' | '#3' | '#4' | '#5'
  imageurl?: string
  allShow?: boolean
}

withDefaults(defineProps<IAspectRatioProps>(), {
  ratio: 16 / 9,
  template: '#1',
  allShow: false,
})

const root = ref<InstanceAspectRatioType>()
onMounted(() => {
  // eslint-disable-next-line no-console
  console.log(root.value?.$el)
})
</script>

<template>
  <div class="cursor-default inline-block gap-6">
    <div v-if="template === '#1' || allShow" class="w-[300px] rounded-sm overflow-hidden">
      <OkuAspectRatio ref="root" class="bg-cyan-500 flex items-center justify-center text-white font-bold">
        <h1>Default ratio (1/1)</h1>
      </OkuAspectRatio>
    </div>
    <div v-if="template === '#2' || allShow" class="flex gap-6">
      <div class="w-[150px] rounded-sm overflow-hidden">
        <OkuAspectRatio :ratio="1 / 2">
          <img
            class="object-cover w-full h-full rounded-lg"
            src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
            alt="Landscape photograph by Tobias Tullius"
          >
        </OkuAspectRatio>
      </div>
      <div class="w-[150px] rounded-sm overflow-hidden">
        <OkuAspectRatio>
          <img
            class="object-cover w-full h-full rounded-lg"
            src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
            alt="Landscape photograph by Tobias Tullius"
          >
        </OkuAspectRatio>
      </div>
      <div class="w-[150px] rounded-sm overflow-hidden">
        <OkuAspectRatio :ratio="16 / 9">
          <img
            class="object-cover w-full h-full rounded-lg"
            src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
            alt="Landscape photograph by Tobias Tullius"
          >
        </OkuAspectRatio>
      </div>
      <div class="w-[150px] rounded-sm overflow-hidden">
        <OkuAspectRatio :ratio="2 / 1">
          <img
            class="object-cover w-full h-full rounded-lg"
            src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
            alt="Landscape photograph by Tobias Tullius"
          >
        </OkuAspectRatio>
      </div>
    </div>
  </div>
</template>
