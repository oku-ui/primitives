<script setup lang="ts">
import { ToggleGroupItem, ToggleGroupRoot } from '../index.ts'
import './styles.css'
</script>

<template>
  <ToggleGroupRoot
    type="single"
    orientation="vertical"
    class="toggleGroup_root"
    aria-label="Options"
    default-value="1"
  >
    <ToggleGroupItem value="1" class="toggleGroup_item">
      Option 1
    </ToggleGroupItem>
    <ToggleGroupItem value="2" class="toggleGroup_item">
      Option 2
    </ToggleGroupItem>
    <ToggleGroupItem value="3" class="toggleGroup_item">
      Option 3
    </ToggleGroupItem>
  </ToggleGroupRoot>
</template>
