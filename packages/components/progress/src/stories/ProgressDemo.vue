<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { ProgressProps } from '@oku-ui/progress'
import { OkuProgress, OkuProgressIndicator } from '@oku-ui/progress'
import { computed, ref } from 'vue'

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
const value = ref<number | null>(13)
const valueCopy = ref<number | null>(null)
const percentage = computed(() => value.value != null ? Math.round((value.value / max) * 100) : null)

console.log(typeof value.value)

function toggleIndeterminate() {
  if (value.value === null) {
    value.value = valueCopy.value
    valueCopy.value = null
  }
  else {
    valueCopy.value = value.value
    value.value = null
  }
}
</script>

<template>
  <div class="cursor-default inline-block">
    <div v-if="template === '#1' || allshow" class="flex flex-col">
      <OkuProgress class="w-400px h-25px max-w-full border-5 border-black bg-gray-200" :value="value" :max="max">
        <OkuProgressIndicator
          class="indicator w-0 h-full transition duration-150 ease-out"
          :style="{ width: percentage != null ? `${percentage}%` : undefined }"
        />
      </OkuProgress>
      {{ value }}
      <br>
      <button @click="toggleIndeterminate">
        Toggle Indeterminate
      </button>
      <input v-model.number="value" type="range" min="0" :max="max" :disabled="value === null">
    </div>
  </div>
</template>

<style scoped>
.indicator[data-state="complete"]{
  background-color: green;
}

.indicator[data-state="loading"]{
  background-color: gray;
}
</style>
