<script setup lang="ts">
import {
  OkuToggleGroup,
  OkuToggleGroupItem,
} from '@oku-ui/toggle-group'
import { ref } from 'vue'

export interface ITabsProps {
  template?: '#1' | '#2' | '#3'
  allshow?: boolean
}

defineProps<ITabsProps>()

const value = ref<string>()
</script>

<template>
  <div v-if="template === '#1' || allshow">
    <h1>Uncontrolled</h1>
    <OkuToggleGroup type="single" class="root" aria-label="Options" default-value="1">
      <OkuToggleGroupItem value="1" class="item">
        Option 1
      </OkuToggleGroupItem>
      <OkuToggleGroupItem value="2" class="item">
        Option 2
      </OkuToggleGroupItem>
      <OkuToggleGroupItem value="3" class="item">
        Option 3
      </OkuToggleGroupItem>
    </OkuToggleGroup>
  </div>
</template>

<style>
.root {
  display: inline-flex;
  gap: 5px;
  padding: 5px;
  &[data-orientation="vertical"] {
    flex-direction: column;
  }
}

.item {
  border: 1px solid black;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 13px;
  background-color: white;
  color: black;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5);
  }

  &:disabled {
    opacity: 0.5;
  }

  &[data-state="on"] {
    background-color: black;
    color: white;
  }
}

.item-attr {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="off"] {
    border-color: red;
  }
  &[data-state="on"] {
    border-color: green;
  }
  &[data-disabled] {
    border-style: dashed;
  }
  &:disabled {
    opacity: 0.5;
  }
}
</style>
