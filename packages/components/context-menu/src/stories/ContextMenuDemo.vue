<script setup lang="ts">
import Styled from './Styled.vue'
import Modality from './Modality.vue'
import Submenus from './Submenus.vue'
import WithLabels from './WithLabels.vue'
import CheckboxItems from './CheckboxItems.vue'
import RadioItems from './RadioItems.vue'
import PreventClosing from './PreventClosing.vue'
import Multiple from './Multiple.vue'
import Nested from './Nested.vue'

withDefaults(defineProps<IContextMenuProps>(), {})

export interface IContextMenuProps {
  template?: 'Styled' | 'Modality' | 'Submenus' | 'WithLabels' | 'CheckboxItems' | 'RadioItems' | 'PreventClosing' | 'Multiple' | 'Nested'
  allshow?: boolean
}
</script>

<template>
  <div>
    <template v-if="template === 'Styled' || allshow">
      <Styled />
    </template>

    <template v-if="template === 'Modality' || allshow">
      <Modality />
    </template>

    <template v-if="template === 'Submenus' || allshow">
      <Submenus />
    </template>

    <template v-if="template === 'WithLabels' || allshow">
      <WithLabels />
    </template>

    <template v-if="template === 'CheckboxItems' || allshow">
      <CheckboxItems />
    </template>

    <template v-if="template === 'RadioItems' || allshow">
      <RadioItems />
    </template>

    <template v-if="template === 'PreventClosing' || allshow">
      <PreventClosing />
    </template>

    <template v-if="template === 'Multiple' || allshow">
      <Multiple />
    </template>

    <template v-if="template === 'Nested' || allshow">
      <Nested />
    </template>
  </div>
</template>

<style>
.context-menu-content {
  display: inline-block;
  box-sizing: border-box;
  min-width: 130px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  font-family: apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif;
  font-size: 13px;
  &:focus-within {
    border-color: #111;
  }
}

.context-menu-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1px;
  cursor: default;
  user-select: none;
  white-space: nowrap;
  height: 25px;
  padding: 0px 10px;
  color: #111;
  border-radius: 3px;

  color: #ccc;
}
/*
.context-menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1px;
  cursor: default;
  user-select: none;
  white-space: nowrap;
  height: 25px;
  padding: 0px 10px;
  color: #111;
  border-radius: 3px;

  outline: none;

  &[data-highlighted] {
    background-color: #111;
    color: #fff;
  }

  &[data-disabled] {
    color: #ccc;
  }
} */

/* .context-menu-sub-trigger {
  &:not([data-highlighted])[data-state="open"] {
    background-color: #ccc;
    color: #111;
  }
} */

.context-menu-separator {
  height: 1px;
  margin: 5px 10px;
  background-color: #ccc;
}

/* @keyframes context-menu-animate-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
} */

/* @keyframes context-menu-animate-out {
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(0.95);
    opacity: 0;
  }
} */

/* .context-menu-animated-content {
  &[data-state="open"] {
    animation: context-menu-animate-in 300ms ease;
  }

  &[data-state="closed"] {
    animation: context-menu-animate-out 300ms ease;
  }
} */

/* .context-menu-animated-item-indicator {
  &[data-state="checked"] {
    animation: context-menu-animate-in 300ms ease;
  }

  &[data-state="unchecked"] {
    animation: context-menu-animate-out 300ms ease;
  }
} */

.context-menu-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 100px;
  border: 2px dashed 111;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5);
  }

  &[data-state="open"] {
    background-color: lightblue,
  }
}

@keyframes context-menu-scale-in {
  0% {
    transform: scale(0) rotateZ(-10deg);
  }

  20% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.context-menu-animated-content {
  display: inline-block;
  box-sizing: border-box;
  min-width: 130px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  font-family: apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif;
  font-size: 13px;
  &:focus-within {
    border-color: #111;
  }

  transform-origin: var(--oku-context-menu-content-transform-origin);
  &[data-state="open"] {
    animation: context-menu-scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)
  };
}
</style>
