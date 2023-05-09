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
const rootClass = ['w-400px', 'h-25px', 'max-w-full', 'border-5px', 'border-black', 'bg-gray-200']
const styledClass = ['bg-blue-300', 'border-2px', 'border-black', 'p-10px']

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
      <OkuProgress :class="rootClass" :value="value" :max="max">
        <OkuProgressIndicator
          class="indicator w-0 h-full transition duration-150 ease-out"
          :style="{ width: percentage != null ? `${percentage}%` : undefined }"
        />
      </OkuProgress>
      {{ value }}
      <br>
      <button class="my-10 p-4 bg-gray-200 hover:bg-gray-400" @click="toggleIndeterminate">
        Toggle Indeterminate
      </button>
      <input v-model.number="value" type="range" min="0" :max="max" :disabled="value === null">
    </div>
    <!-- TODO: How to bind CSS styles with Element properties simply？ -->
    <div v-if="template === '#2' || allshow" class="flex flex-col">
      <h1>Loading (not started)</h1>
      0/100
      <OkuProgress :value="0" :class="rootClass">
        <OkuProgressIndicator class="indicator" />
      </OkuProgress>

      <h1>Loading (started)</h1>
      30/100
      <OkuProgress :value="30" :class="rootClass">
        <OkuProgressIndicator class="indicator" />
      </OkuProgress>

      <h1>Indeterminate</h1>
      /100
      <OkuProgress :value="null" :class="rootClass">
        <OkuProgressIndicator class="indicator" />
      </OkuProgress>

      <h1>Complete</h1>
      100/100
      <OkuProgress :value="100" :class="rootClass">
        <OkuProgressIndicator class="indicator" />
      </OkuProgress>

      <h1>State attributes</h1>
      <h2>Loading (started)</h2>
      <OkuProgress :value="30" :class="styledClass">
        <OkuProgressIndicator class="styles" :class="styledClass" />
      </OkuProgress>

      <h2>Indeterminate</h2>
      <OkuProgress :value="null" :class="styledClass">
        <OkuProgressIndicator class="styles" :class="styledClass" />
      </OkuProgress>

      <h2>Complete</h2>
      <OkuProgress :value="100" :class="styledClass">
        <OkuProgressIndicator class="styles" :class="styledClass" />
      </OkuProgress>
    </div>
  </div>
</template>

<style scoped>
.indicator[data-state="complete"] {
  background-color: green;
}

.indicator[data-state="loading"] {
  background-color: gray;
}
.styles[data-state="complete"] {
  border-color: green;
}

.styles[data-state="loading"] {
  border-color: red;
}
.styles[data-state="indeterminate"] {
  border-color: purple;
}
</style>
