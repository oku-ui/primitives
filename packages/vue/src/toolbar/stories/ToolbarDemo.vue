<script setup lang="ts">
import Chromatic from './Chromatic.vue'
import Styled from './Styled.vue'

export interface OkuToolbarProps {
  template: 'Styled' | 'Chromatic'
  allshow?: boolean
}

withDefaults(defineProps<OkuToolbarProps>(), {
  template: 'Styled',
})
</script>

<template>
  <div class="cursor-default inline-block">
    <div v-if="template === 'Styled' || allshow" class="flex flex-col">
      <Styled />
    </div>
    <div v-if="template === 'Chromatic' || allshow" class="flex flex-col">
      <Chromatic />
    </div>
  </div>
</template>

<style>
.toolbar-root {
  &[data-orientation="vertical"] {
    flex-direction: column;
  }

  display: inline-flex;
  box-sizing: border-box;
  min-width: 130px;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  font-family: apple-system,
  BlinkMacSystemFont,
  helvetica,
  arial,
  sans-serif;
  font-size: 13px;

  &:focus-within {
    border-color: #000;
  }
}

.toolbar-separator {
  height: 1px;
  margin: 5px;
  background-color: #f0f0f0;

  &[data-orientation="vertical"] {
    width: 1px;
    height: auto;
  }
}

.toolbar-item {
  border: 1px solid #000;
  border-radius: 6px;
  background-color: transparent;
  padding: 5px 10px;
  font-family: apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif;
  font-size: 13px;

  display: flex;
  align-items: center;

  &:focus,
  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5);
  }

  &[data-disabled] {
    opacity: 0.5;
    user-select: none;
  }
}

.toolbar-link {
  border: 1px solid #000;
  border-radius: 6px;
  background-color: transparent;
  padding: 5px 10px;
  font-family: apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif;
  font-size: 13px;

  display: flex;
  align-items: center;

  &:focus,
  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5);
  }

  &[data-disabled] {
    opacity: 0.5;
    user-select: none;
  }

  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: black;
}

.toolbar-toggleButton {
  border: 1px solid #000;
  border-radius: 6px;
  background-color: transparent;
  padding: 5px 10px;
  font-family: apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif;
  font-size: 13px;

  display: flex;
  align-items: center;

  &:focus,
  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5);
  }

  &[data-disabled] {
    opacity: 0.5;
    user-select: none;
  }

  &[data-state="on"] {
    background: black;
    color: white;
  }
}

.toolbar-toggleGroup {
  display: flex;
  gap: 5px;

  &[data-orientation="vertical"] {
    flex-direction: column;
  }
}

.toolbar-toggleItem {
  border: 1px solid #000;
  border-radius: 6px;
  background-color: transparent;
  padding: 5px 10px;
  font-family: apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif;
  font-size: 13px;

  display: flex;
  align-items: center;

  &:focus,
  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5);
  }

  &[data-disabled] {
    opacity: 0.5;
    user-select: none;
  }

  &[data-state="on"] {
    background: black;
    color: white;
  }
}
</style>
