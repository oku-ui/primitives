<script setup lang="ts">
import { ref } from 'vue'
import { OkuToggleGroup, OkuToggleGroupItem } from '@oku-ui/toggle-group'

const value = ref<string[]>([])
</script>

<template>
  <h1>Uncontrolled</h1>
  <OkuToggleGroup
    type="multiple"
    class="toggle-group"
    aria-label="Options"
    :default-value="['1']"
  >
    <OkuToggleGroupItem value="1" class="toggle-group-item">
      Option 1
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="2" class="toggle-group-item">
      Option 2
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="3" class="toggle-group-item">
      Option 3
    </OkuToggleGroupItem>
  </OkuToggleGroup>

  <h1>Controlled</h1>
  <OkuToggleGroup
    type="multiple"
    class="toggle-group"
    aria-label="Options"
    :value="value"
    @value-change="value = $event"
  >
    <OkuToggleGroupItem value="1" class="toggle-group-item">
      Option 1
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="2" class="toggle-group-item">
      Option 2
    </OkuToggleGroupItem>
    <OkuToggleGroupItem value="3" class="toggle-group-item">
      Option 3
    </OkuToggleGroupItem>
  </OkuToggleGroup>
</template>
