<script setup lang="ts">
import Controlled from './Controlled.vue'
import Promise from './Promise.vue'
import KeyChange from './KeyChange.vue'
import PauseResumeProps from './PauseResumeProps.vue'
import Animated from './Animated.vue'
import Cypress from './Cypress.vue'
import Chromatic from './Chromatic.vue'
import Styled from './Styled.vue'
import FromDialog from './FromDialog.vue'

withDefaults(defineProps<IToastProps>(), {})
const VIEWPORT_PADDING = '20px'
export interface IToastProps {
  template?: 'Styled' | 'Controlled' | 'FromDialog' | 'Promise' | 'KeyChange' | 'PauseResumeProps' | 'Animated' | 'Cypress' | 'Chromatic'
  allshow?: boolean
}
</script>

<template>
  <div>
    <template v-if="template === 'Styled' || allshow">
      <Styled />
    </template>

    <template v-if="template === 'Controlled' || allshow">
      <Controlled />
    </template>

    <template v-if="template === 'FromDialog' || allshow">
      <FromDialog />
    </template>

    <template v-if="template === 'Promise' || allshow">
      <Promise />
    </template>

    <template v-if="template === 'KeyChange' || allshow">
      <KeyChange />
    </template>

    <template v-if="template === 'PauseResumeProps' || allshow">
      <PauseResumeProps />
    </template>

    <template v-if="template === 'Animated' || allshow">
      <Animated />
    </template>

    <template v-if="template === 'Cypress' || allshow">
      <Cypress />
    </template>

    <template v-if="template === 'Chromatic' || allshow">
      <Chromatic />
    </template>
  </div>
</template>

<style>
.viewport {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: v-bind(VIEWPORT_PADDING);
  gap: v-bind(VIEWPORT_PADDING);
  list-style: none;
}

.toast {
  position: relative;
  overflow: hidden;
  list-style: none;
  width: 230px;
  border-radius: 4px;
  border: 1px solid black;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 10px;
  font-size: 12px;
}

.header {
  padding: 5px 10px;
  margin: -10px -10px 10px;
  background: black;
  color: white;
  position: relative;
  height: 22px;
  display: flex;
  align-items: center;
}

.title {
  font-size: inherit;
  font-weight: normal;
}

.description {
  margin: 0;
}

.button {
  border: 1px solid black;
  border-radius: 4px;
  background: gainsboro;
  font-family: inherit;
  padding: 2px 5px;
}

.button:hover,
.button:focus {
  background: royalblue;
  border-color: darkblue;
  color: white;
}

.close {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  padding: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes slideRight {
  from {
    transform: translateX(var(--oku-toast-swipe-end-x));
  }

  to {
    transform: translateX(calc(100% + v-bind(VIEWPORT_PADDING)));
  }
}

@keyframes slideLeft {
  from {
    transform: translateX(var(--oku-toast-swipe-end-x));
  }

  to {
    transform: translateX(calc(-100% - v-bind(VIEWPORT_PADDING)));
  }
}

@keyframes slideUp {
  from {
    transform: translateY(var(--oku-toast-swipe-end-y));
  }

  to {
    transform: translateY(calc(-100% - v-bind(VIEWPORT_PADDING)));
  }
}

@keyframes slideDown {
  from {
    transform: translateY(var(--oku-toast-swipe-end-y));
  }

  to {
    transform: translateY(calc(100% + v-bind(VIEWPORT_PADDING)));
  }
}

.error-toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

[data-state="open"] {
  animation: fadeIn 200ms ease-out;
}

[data-state="closed"] {
  animation: fadeOut 200ms ease-out;
}

[data-swipe="move"] {
  transform: translate(var(--oku-toast-swipe-move-x), var(--oku-toast-swipe-move-y));
}

[data-swipe="cancel"] {
  transform: translate(0, 0);
  transition: transform 200ms ease-out;
}

[data-swipe="end"][data-swipe-direction="right"] {
  animation-name: slideRight;
}

[data-swipe="end"][data-swipe-direction="left"] {
  animation-name: slideLeft;
}

[data-swipe="end"][data-swipe-direction="up"] {
  animation-name: slideUp;
}

[data-swipe="end"][data-swipe-direction="down"] {
  animation-name: slideDown;
}

.chromatic-viewport {
  display: inline-flex;
  border: 5px solid royalblue;
  flex-direction: column;
  padding: v-bind(VIEWPORT_PADDING);
  gap: v-bind(VIEWPORT_PADDING);
}
</style>
