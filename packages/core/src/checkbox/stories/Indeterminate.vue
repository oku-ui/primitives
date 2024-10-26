<script setup lang="ts">
import { shallowRef } from 'vue'
import { CheckboxIndicator, CheckboxRoot } from '../index.ts'
import './styles.css'

const checked = shallowRef<boolean | 'indeterminate'>('indeterminate')

function onClick() {
  checked.value = checked.value === 'indeterminate' ? false : 'indeterminate'
}
</script>

<template>
  <div>
    <p>
      <CheckboxRoot v-model:checked="checked" class="checkbox_rootClass">
        <CheckboxIndicator class="checkbox_indicatorClass" />
      </CheckboxRoot>
    </p>

    <button
      type="button"
      @click="onClick"
    >
      Toggle indeterminate
    </button>
  </div>
</template>
