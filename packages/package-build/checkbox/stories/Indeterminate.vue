<script setup lang="ts">
import { ref } from 'vue'
import { OkuCheckbox, OkuCheckboxIndicator } from '@oku-ui/checkbox'

const checked = ref<boolean | 'indeterminate'>('indeterminate')
</script>

<template>
  <p>
    <OkuCheckbox class="checkbox" :checked="checked" @checked-change="checked = $event">
      <OkuCheckboxIndicator class="checkbox-indicator" />
    </OkuCheckbox>
  </p>

  <button
    type="button"
    @click="checked = checked === 'indeterminate' ? false : 'indeterminate'"
  >
    Toggle indeterminate
  </button>
</template>
