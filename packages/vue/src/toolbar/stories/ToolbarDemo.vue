<script setup lang="ts">
import Styled from './Styled.vue'
import Chromatic from './Chromatic.vue'

withDefaults(defineProps<IToolbarProps>(), {})

export interface IToolbarProps {
  template: 'Styled' | 'Chromatic'
  allshow?: boolean
}
</script>

<template>
  <div>
    <template v-if="template === 'Styled' || allshow">
      <Styled />
    </template>

    <template v-if="template === 'Chromatic' || allshow">
      <Chromatic />
    </template>
  </div>
</template>

<style>
.toolbar {
  /* RECOMMENDED_CSS_TOOLBAR */
  /* ensures things are layed out correctly by default */
  display: flex;
  &[data-orientation="vertical"] {
    flex-direction: column;
  }

  display: inline-flex;
  gap: 5px;
  box-sizing: border-box;
  min-width: 130px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  font-family: apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif;
  font-size: 13px;

  &:focus-within {
    border-color: #111;
  }
}

.toolbar-separator {
  height: 1px;
  margin: 5px;
  background-color: #ccc;

  &[data-orientation="vertical"] {
    width: 1px;
    height: auto;
  }
}

.toolbar-item {
  border: 1px solid #111;
  border-radius: 6px;
  background-color: transparent;
  padding: 5px 10px;
  font-family: apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif;
  font-size: 13px;

  display: flex;
  align-items: center;

  &:focus, &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5);
  }

  &[data-disabled] {
    opacity: 0.5;
    user-select: none;
  }
}

.toolbar-link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: black;
}

.toolbar-toggle-button {
  &[data-state="on"] {
    background: black;
    color: white;
  }
}

.toolbar-toggle-group {
  /* RECOMMENDED_CSS_TOOLBAR */
  display: flex;
  gap: 5px;

  &[data-orientation="vertical"] {
    flex-direction: column;
  }
}

.toolbar-toggle-item {
  &[data-state="on"] {
    background: black;
    color: white;
  }
}
</style>
