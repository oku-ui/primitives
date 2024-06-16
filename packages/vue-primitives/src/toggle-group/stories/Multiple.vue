<script setup lang="ts">
import './styles.css'
import { shallowRef } from 'vue'
import { ToggleGroup, ToggleGroupItem } from '../index.ts'

const value = shallowRef<string[]>([])
</script>

<template>
  <h1>Uncontrolled</h1>
  <ToggleGroup
    type="multiple"
    class="toggleGroup_root"
    aria-label="Options"
    :default-value="['1']"
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
  </ToggleGroup>

  <h1>Controlled</h1>
  <ToggleGroup
    v-model="value"
    type="multiple"
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
  </ToggleGroup>
</template>
