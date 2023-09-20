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

const testValue = ref()
const arrayValue = ref()
</script>

<template>
  <div v-if="template === '#1' || allshow">
    {{ testValue }}
    <h1>Uncontrolled</h1>
    <OkuToggleGroup v-model="testValue" type="single" class="toggle-group-rootClass" aria-label="Options" @value-change="console.log">
      <OkuToggleGroupItem value="1" class="toggle-group-itemClass">
        Option 1
      </OkuToggleGroupItem>
      <OkuToggleGroupItem value="2" class="toggle-group-itemClass">
        Option 2
      </OkuToggleGroupItem>
      <OkuToggleGroupItem value="3" class="toggle-group-itemClass">
        Option 3
      </OkuToggleGroupItem>
    </OkuToggleGroup>

    {{ arrayValue }}
    <h1>Group</h1>
    <OkuToggleGroup v-model="arrayValue" type="multiple" class="toggle-group-rootClass" aria-label="Options">
      <OkuToggleGroupItem value="1" class="toggle-group-itemClass">
        Option 1
      </OkuToggleGroupItem>
      <OkuToggleGroupItem value="2" class="toggle-group-itemClass">
        Option 2
      </OkuToggleGroupItem>
      <OkuToggleGroupItem value="3" class="toggle-group-itemClass">
        Option 3
      </OkuToggleGroupItem>
    </OkuToggleGroup>
  </div>
</template>

<style lang="postcss">
.toggle-group-rootClass {
  display: inline-flex;
  gap: 5px;
  padding: 5px;
  &[data-orientation="vertical"] {
    flex-direction: column;
  }
}

.toggle-group-itemClass {
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

.toggle-group-itemClass-attr {
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
