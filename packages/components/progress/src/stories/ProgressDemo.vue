<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { ProgressProps } from '@oku-ui/progress'
import { OkuProgress, OkuProgressIndicator } from '@oku-ui/progress'
import { computed, ref, watch } from 'vue'

export interface OkuProgressProps extends ProgressProps {
  template?: '#1' | '#2'
  allshow?: boolean
}

withDefaults(defineProps<OkuProgressProps>(), {
  label: 'First Name',
  template: '#1',
})

// #1
const max = 150
const value = ref(13)
const percentage = computed(() => value.value != null ? Math.round((value.value / max) * 100) : null)

console.log(typeof value.value)

watch(value, (newvalue) => {
  console.log(typeof value.value)
  console.log(typeof newvalue)
})
</script>

<template>
  <div class="cursor-default inline-block">
    <div v-if="template === '#1' || allshow" class="flex flex-col">
      <OkuProgress class="w-400px h-25px max-w-full border-5 border-black bg-gray-200" :value="value" :max="max">
        <OkuProgressIndicator
          class="w-0 h-full bg-red transition duration-150 ease-out"
          :style="{ width: percentage != null ? `${percentage}%` : undefined }"
        />
      </OkuProgress>
      {{ value }}
      <input v-model.number="value" type="range" min="0" :max="max">
      <input v-model="value" type="number">
    </div>
  </div>
</template>
