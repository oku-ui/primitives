<script setup lang="ts">
import Styled from './Styled.vue'
import Submenus from './Submenus.vue'
import WithLabels from './WithLabels.vue'
import Typeahead from './Typeahead.vue'
import CheckboxItems from './CheckboxItems.vue'
import RadioItems from './RadioItems.vue'
import Animated from './Animated.vue'

withDefaults(defineProps<IMenuProps>(), {})

export interface IMenuProps {
  template?: 'Styled' | 'Submenus' | 'WithLabels' | 'Typeahead' | 'CheckboxItems' | 'RadioItems' | 'Animated'
  allshow?: boolean
}
</script>

<template>
  <div>
    <template v-if="template === 'Styled' || allshow">
      <Styled />
    </template>

    <template v-if="template === 'Submenus' || allshow">
      <Submenus />
    </template>

    <template v-if="template === 'WithLabels' || allshow">
      <WithLabels />
    </template>

    <template v-if="template === 'Typeahead' || allshow">
      <Typeahead />
    </template>

    <template v-if="template === 'CheckboxItems' || allshow">
      <CheckboxItems />
    </template>

    <template v-if="template === 'RadioItems' || allshow">
      <RadioItems />
    </template>

    <template v-if="template === 'Animated' || allshow">
      <Animated />
    </template>
  </div>
</template>

<style>
.menu-content {
  display: inline-block;
  box-sizing: border-box;
  min-width: 130px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 5px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  font-family: 'apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif';
  font-size: 13px;
  &:focus-within {
    border-color: #111;
  }
}

/* .item-styles {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1px;
  cursor: default;
  user-select: none;
  white-space: nowrap;
  height: 25px;
  padding: 0 10px;
  color: #111;
  border-radius: 3px;
} */

.menu-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1px;
  cursor: default;
  user-select: none;
  white-space: nowrap;
  height: 25px;
  padding: 0 10px;
  color: #111;
  border-radius: 3px;

  color: #ccc;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1px;
  cursor: default;
  user-select: none;
  white-space: nowrap;
  height: 25px;
  padding: 0 10px;
  color: #111;
  border-radius: 3px;

  outline: 'none';

  &[data-highlighted] {
    background-color: #111;
    color: #fff;
  }

  &[data-disabled] {
    color: #ccc;
  }
}

.menu-sub-trigger {
  &:not([data-highlighted])[data-state="open"] {
    background-color: #ccc;
    color: #111;
  }
}

.menu-separator {
  height: 1px;
  margin: 5px 10px;
  background-color: #ccc;
}

@keyframes menu-animate-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes menu-animate-out {
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(0.95);
    opacity: 0;
  }
}

.menu-animated-content {
  &[data-state="open"] {
    animation: menu-animate-in 300ms ease;
  }

  &[data-state="closed"] {
    animation: menu-animate-out 300ms ease;
  }
}

.menu-animated-item-indicator {
  &[data-state="checked"] {
    animation: menu-animate-in 300ms ease;
  }

  &[data-state="unchecked"] {
    animation: menu-animate-out 300ms ease;
  }
}
</style>
