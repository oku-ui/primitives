<script setup lang="ts">
import { shallowRef } from 'vue'
import { Checkbox, CheckboxIndicator } from '../index.ts'
import './styles.css'

const checked = shallowRef<boolean | 'indeterminate'>('indeterminate')
</script>

<template>
  <div>
    <p>
      <Checkbox v-model:checked="checked" class="checkbox_rootClass">
        <CheckboxIndicator class="checkbox_indicatorClass checkbox_animatedIndicatorClass" />
      </Checkbox>
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
