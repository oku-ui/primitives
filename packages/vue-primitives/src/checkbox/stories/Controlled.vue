<script setup lang="ts">
import { shallowRef } from 'vue'
import { Label } from '../../label/index.ts'
import { Checkbox, CheckboxIndicator } from '../index.ts'
import './styles.css'

const checked = shallowRef<boolean | 'indeterminate'>(true)
</script>

<template>
  <div>
    <p>This checkbox is placed adjacent to its label. The state is controlled.</p>
    <Label for="randBox">Label</Label>{{ ' ' }}
    <Checkbox
      id="randBox"
      v-model:checked="checked"
      class="checkbox_rootClass"
    >
      <CheckboxIndicator class="checkbox_indicatorClass" />
    </Checkbox>
  </div>
</template>
