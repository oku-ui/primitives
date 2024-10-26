<script setup lang="ts">
import { shallowRef } from 'vue'
import { CheckboxIndicator, CheckboxRoot } from '../index.ts'
import './styles.css'

const checked = shallowRef<boolean | 'indeterminate'>('indeterminate')
</script>

<template>
  <div>
    <p>
      <CheckboxRoot v-model:checked="checked" class="checkbox_rootClass">
        <CheckboxIndicator class="checkbox_indicatorClass checkbox_animatedIndicatorClass" />
      </CheckboxRoot>
    </p>

    <button
      type="button"
      @click="() => {
        checked = checked === 'indeterminate' ? false : 'indeterminate'
      }"
    >
      Toggle indeterminate
    </button>
  </div>
</template>
