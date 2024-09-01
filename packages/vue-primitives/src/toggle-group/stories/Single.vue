<script setup lang="ts">
import './styles.css'
import { shallowRef } from 'vue'
import { ToggleGroupItem, ToggleGroupRoot } from '../index.ts'

const value = shallowRef<string>()
</script>

<template>
  <h1>Uncontrolled</h1>
  <ToggleGroupRoot type="single" class="toggleGroup_root" aria-label="Options" default-value="1">
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

  <h1>Controlled</h1>
  <ToggleGroupRoot
    v-model:value="value"
    type="single"
    class="toggleGroup_root"
    aria-label="Options"
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
