<script setup lang="ts">
import Styled from './Styled.vue'
import Controlled from './Controlled.vue'
import Chromatic from './Chromatic.vue'

withDefaults(defineProps<IToggleProps>(), {})

export interface IToggleProps {
  template?: 'Styled' | 'Controlled' | 'Chromatic'
  allshow?: boolean
}
</script>

<template>
  <Styled v-if="template === 'Styled' || allshow" />

  <Controlled v-if="template === 'Controlled' || allshow" />

  <Chromatic v-if="template === 'Chromatic' || allshow" />
</template>

<style>
.toggle {
  padding: 6px;
  line-height: 1;
  border: none;
  font-family: 'sans-serif';
  font-weight: bold;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #111;
  }

  &[data-disabled] {
    opacity: 0.5
  }

  &[data-state="off"] {
    background-color: crimson;
    color: #fff;
  }

  &[data-state="on"] {
    background-color: green;
    color: #fff;
  }
}

.toggle-attr-styles {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &:disabled { opacity: 0.5 }
  &[data-disabled] { border-style: dashed }
}
</style>
