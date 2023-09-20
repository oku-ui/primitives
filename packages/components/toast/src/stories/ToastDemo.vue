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
.toast_viewport {
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

.toast_toastClass {
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

.toast_headerClass {
  padding: 5px 10px;
  margin: -10px -10px 10px;
  background: black;
  color: white;
  position: relative;
  height: 22px;
  display: flex;
  align-items: center;
}

.toast_titleClass {
  font-size: inherit;
  font-weight: normal;
}

.toast_descriptionClass {
  margin: 0;
}

.buttonClass {
  border: 1px solid black;
  border-radius: 4px;
  background: gainsboro;
  font-family: inherit;
  padding: 2px 5px;

  &:hover,
  &:focus {
    background: royalblue;
    border-color: darkblue;
    color: white;
  }

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

@keyframes toast_fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes toast_fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes toast_slideRight {
  from {
    transform: translateX(var(--oku-toast-swipe-end-x));
  }

  to {
    transform: translateX(calc(100% + v-bind(VIEWPORT_PADDING)));
  }
}

@keyframes toast_slideLeft {
  from {
    transform: translateX(var(--oku-toast-swipe-end-x));
  }

  to {
    transform: translateX(calc(-100% - v-bind(VIEWPORT_PADDING)));
  }
}

@keyframes toast_slideUp {
  from {
    transform: translateY(var(--oku-toast-swipe-end-y));
  }

  to {
    transform: translateY(calc(-100% - v-bind(VIEWPORT_PADDING)));
  }
}

@keyframes toast_slideDown {
  from {
    transform: translateY(var(--oku-toast-swipe-end-y));
  }

  to {
    transform: translateY(calc(100% + v-bind(VIEWPORT_PADDING)));
  }
}

.toast_errorToast {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.animatedRootClass {
  &[data-state="open"] {
    animation: toast_fadeIn 200ms ease-out;
  }

  &[data-state="closed"] {
    animation: toast_fadeOut 200ms ease-out;
  }

  &[data-swipe="move"] {
    transform: translate(var(--oku-toast-swipe-move-x), var(--oku-toast-swipe-move-y));
  }

  &[data-swipe="cancel"] {
    transform: translate(0, 0);
    transition: transform 200ms ease-out;
  }

  &[data-swipe="end"] {
    animation-duration: 300ms;
    animation-timing-function: ease-out;

    &[data-swipe-direction="right"] {
      animation-name: toast_slideRight;
    }

    &[data-swipe-direction="left"] {
      animation-name: toast_slideLeft;
    }

    &[data-swipe-direction="up"] {
      animation-name: toast_slideUp;
    }

    &[data-swipe-direction="down"] {
      animation-name: toast_slideDown;
    }
  }
}

.toast_chromatic_toast_viewport {
  display: inline-flex;
  border: 5px solid royalblue;
  flex-direction: column;
  padding: v-bind(VIEWPORT_PADDING);
  gap: v-bind(VIEWPORT_PADDING);
}
</style>
