<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from '../index.ts'
import { useIndeterminateToggle, usePreviousValueRef, useProgressValueState } from './utils.ts'
import './styles.css'

const max = 150
const [value, percentage, setValue] = useProgressValueState(0, max)
const toggleIndeterminate = useIndeterminateToggle(value, setValue)

const previousValueRef = usePreviousValueRef(value)
</script>

<template>
  <div>
    <ProgressRoot class="progress_rootClass" :value="value" :max="max">
      <ProgressIndicator
        class="progress_indicatorClass"
        :style="{
          width: percentage != null ? `${percentage}%` : undefined,
        }"
      />
    </ProgressRoot>
    <hr>
    <button @click="toggleIndeterminate">
      Toggle Indeterminate
    </button>

    <input
      type="range"
      :disabled="value == null"
      :value="value == null ? previousValueRef : value"
      :max="max"
      :min="0"
      @input="(e) => {
        const val = Number((e.target as HTMLInputElement).value);
        if (!isNaN(val)) {
          setValue(val);
        }
      }"
    >
  </div>
</template>
