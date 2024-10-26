<script setup lang="ts">
import { shallowRef } from 'vue'
import { Label } from '../../label/index.ts'
import { CheckboxIndicator, CheckboxRoot } from '../index.ts'
import './styles.css'

const checked = shallowRef<boolean | 'indeterminate'>(true)
</script>

<template>
  <div>
    <p>This checkbox is placed adjacent to its label. The state is controlled.</p>
    <Label for="randBox">Label</Label>{{ ' ' }}
    <CheckboxRoot
      id="randBox"
      v-model:checked="checked"
      class="checkbox_rootClass"
    >
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </CheckboxRoot>
  </div>
</template>
