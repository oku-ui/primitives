<script setup lang="ts">
import { OkuProgress, OkuProgressIndicator } from '@oku-ui/progress'
import { computed, ref } from 'vue'

export interface OkuProgressProps {
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
const rootClass = ['w-[400px]', 'h-[25px]', 'max-w-full', 'border-[5px]', 'border-black', 'bg-gray-200']

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
          class="progress_indicator w-0 h-full transition duration-150 ease-out"
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
    <!-- TODO: How to bind CSS progress_styles with Element properties simply？ -->
    <div v-if="template === '#2' || allshow" class="flex flex-col">
      <h1>Loading (not started)</h1>
      0/100
      <OkuProgress :value="0" :class="rootClass">
        <OkuProgressIndicator class="progress_indicator" />
      </OkuProgress>

      <h1>Loading (started)</h1>
      30/100
      <OkuProgress :value="30" :class="rootClass">
        <OkuProgressIndicator class="progress_indicator" />
      </OkuProgress>

      <h1>Indeterminate</h1>
      /100
      <OkuProgress :value="null" :class="rootClass">
        <OkuProgressIndicator class="progress_indicator" />
      </OkuProgress>

      <h1>Complete</h1>
      100/100
      <OkuProgress :value="100" :class="rootClass">
        <OkuProgressIndicator class="progress_indicator" />
      </OkuProgress>

      <h1>State attributes</h1>
      <h2>Loading (started)</h2>
      <OkuProgress :value="30" class="progress_styledClass">
        <OkuProgressIndicator class="progress_styledClass" />
      </OkuProgress>

      <h2>Indeterminate</h2>
      <OkuProgress :value="null" class="progress_styledClass">
        <OkuProgressIndicator class="progress_styledClass" />
      </OkuProgress>

      <h2>Complete</h2>
      <OkuProgress :value="100" class="progress_styledClass">
        <OkuProgressIndicator class="progress_styledClass" />
      </OkuProgress>
    </div>
  </div>
</template>

<style scoped>
.progress_indicator[data-state="complete"] {
  background-color: green;
}

.progress_indicator[data-state="loading"] {
  background-color: gray;
}
.progress_styles[data-state="complete"] {
  border-color: green;
}

.progress_styles[data-state="loading"] {
  border-color: red;
}
.progress_styles[data-state="indeterminate"] {
  border-color: purple;
}
.progress_styledClass {
  border: 2px solid blue;
  padding: 10px;
  background-color: #eee;

  &[data-state="loading"] {
    border-color: red;
  }
  &[data-state="indeterminate"] {
    border-color: purple;
  }
  &[data-state="complete"] {
    border-color: green;
  }
}
</style>
