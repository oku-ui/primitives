<!-- eslint-disable no-console -->
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { OkuProgress, OkuProgressIndicator } from '@oku-ui/progress'
import type { ProgressProps } from '@oku-ui/progress'

export interface OkuProgressProps extends ProgressProps {
  template?: '#1' | '#2'
  allshow?: boolean
}

withDefaults(defineProps<OkuProgressProps>(), {
  label: 'First Name',
  template: '#1',
})

const value = ref(13)
const style = computed(() => {
  return {
    transform: `translateX(-${100 - value.value}%)`,
  }
})

function startTimer() {
  return setTimeout(() => {
    value.value = 66
  }, 500)
}
let timer: any = null

onMounted(() => {
  timer = startTimer()
})

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<template>
  <div class="cursor-default inline-block">
    <div v-if="template === '#1' || allshow" class="flex flex-col">
      <OkuProgress class="relative overflow-hidden bg-gray-300 rounded-full w-300px h-25px transform translate-z-0" :value="value">
        <OkuProgressIndicator class="bg-blue-500 h-full transition-transform duration-660 ease-out" :style="style" />
      </OkuProgress>
    </div>
  </div>
</template>
