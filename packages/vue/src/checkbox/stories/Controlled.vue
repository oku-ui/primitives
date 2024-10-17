<script setup lang="ts">
import { OkuCheckbox, OkuCheckboxIndicator } from '@oku-ui/checkbox'
import { ref } from 'vue'
import Label from './Label.vue'

const checked = ref<boolean | 'indeterminate'>(true)
</script>

<template>
  <p>This checkbox is placed adjacent to its label. The state is controlled.</p>
  <Label for="randBox">Label</Label>{{ ' ' }}
  <OkuCheckbox
    id="randBox"
    class="checkbox"
    :checked="checked"
    @checked-change="checked = $event"
  >
    <OkuCheckboxIndicator class="checkbox-indicator" />
  </OkuCheckbox>
</template>
