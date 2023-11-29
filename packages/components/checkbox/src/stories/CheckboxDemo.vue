<script setup lang="ts">
import Styled from './Styled.vue'
import Controlled from './Controlled.vue'
import Indeterminate from './Indeterminate.vue'
import WithinForm from './WithinForm.vue'
import Animated from './Animated.vue'
import Chromatic from './Chromatic.vue'

withDefaults(defineProps<ICheckBoxProps>(), {})

export interface ICheckBoxProps {
  template?: 'Styled' | 'Controlled' | 'Indeterminate' | 'WithinForm' | 'Animated' | 'Chromatic'
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

    <template v-if="template === 'Indeterminate' || allshow">
      <Indeterminate />
    </template>

    <template v-if="template === 'WithinForm' || allshow">
      <WithinForm />
    </template>

    <template v-if="template === 'Animated' || allshow">
      <Animated />
    </template>

    <template v-if="template === 'Chromatic' || allshow">
      <Chromatic />
    </template>
  </div>
</template>

<style>
.checkbox {
  /* RECOMMENDED_CSS_CHECKBOX */
  vertical-align: middle;

  border: 1px solid #ccc;
  width: 30px;
  height: 30px;
  padding: 4px;

  &:focus {
    outline: none;
    border-color: crimson;
    box-shadow: 0 0 0 1px crimson;
  }

  &[data-disabled] {
    opacity: 0.3;
  }
}

.checkbox-indicator {
  background-color: crimson;
  display: block;
  width: 20px;
  height: 4px;

  &[data-state="checked"], &[data-state="unchecked"] {
    height: 20px;
  }
}

@keyframes checkbox-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes checkbox-fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.checkbox-animated-indicator {
  transition: height 300ms;

  &[data-state="checked"] {
    animation: checkbox-fade-in 1000ms ease-out;
  }

  &[data-state="unchecked"] {
    animation: checkbox-fade-out 1000ms ease-in;
  }
}

.checkbox-attr-styles, .checkbox-indicator-attr-styles {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="unchecked"] { border-color: red; }
  &[data-state="checked"] { border-color: green; }
  &[data-state="indeterminate"] { border-color: purple; }
  &[data-disabled] { border-style: dashed; }
  &:disabled { opacity: 0.5; }
}
</style>
