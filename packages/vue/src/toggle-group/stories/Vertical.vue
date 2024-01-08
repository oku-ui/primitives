<script setup lang="ts">
import { OkuToggleGroup, OkuToggleGroupItem } from '@oku-ui/toggle-group'
</script>

<template>
  <OkuToggleGroup
    type="single"
    orientation="vertical"
    class="toggle-group"
    aria-label="Options"
    default-value="1"
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
