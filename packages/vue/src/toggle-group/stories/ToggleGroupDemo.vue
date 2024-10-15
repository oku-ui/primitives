<script setup lang="ts">
import Single from './Single.vue'
import Vertical from './Vertical.vue'
import Multiple from './Multiple.vue'
import Chromatic from './Chromatic.vue'

withDefaults(defineProps<IToggleGroupProps>(), {})

export interface IToggleGroupProps {
  template?: 'Single' | 'Vertical' | 'Multiple' | 'Chromatic'
  allshow?: boolean
}
</script>

<template>
  <div>
    <template v-if="template === 'Single' || allshow">
      <Single />
    </template>

    <template v-if="template === 'Vertical' || allshow">
      <Vertical />
    </template>

    <template v-if="template === 'Multiple' || allshow">
      <Multiple />
    </template>

    <template v-if="template === 'Chromatic' || allshow">
      <Chromatic />
    </template>
  </div>
</template>

<style>
.toggle-group {
  display: inline-flex;
  gap: 5px;
  padding: 5px;
  &[data-orientation="vertical"] {
    flex-direction: column;
  }
}

.toggle-group-item {
  border: 1px solid #111;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 13px;
  background-color: #fff;
  color: #111;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5);
  }

  &:disabled {
    opacity: 0.5;
  }

  &[data-state="on"] {
    background-color: #111;
    color: #fff;
  }
}

.toggle-group-attr-styles {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="off"] { border-color: red }
  &[data-state="on"] { border-color: green }
  &[data-disabled] { border-style: dashed }
  &:disabled { opacity: 0.5 }
}
</style>
