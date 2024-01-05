<script setup lang="ts">
import Styled from './Styled.vue'
import Controlled from './Controlled.vue'
import WithinForm from './WithinForm.vue'
import Chromatic from './Chromatic.vue'

withDefaults(defineProps<ISwitchProps>(), {})

export interface ISwitchProps {
  template?: 'Styled' | 'Controlled' | 'WithinForm' | 'Chromatic'
  allshow?: boolean
}

const WIDTH = '50px'
const THUMB_WIDTH = '20px'
const GAP = '4px'
</script>

<template>
  <div>
    <template v-if="template === 'Styled' || allshow">
      <Styled />
    </template>

    <template v-if="template === 'Controlled' || allshow">
      <Controlled />
    </template>

    <template v-if="template === 'WithinForm' || allshow">
      <WithinForm />
    </template>

    <template v-if="template === 'Chromatic' || allshow">
      <Chromatic />
    </template>
  </div>
</template>

<style>
.switch {
  /* RECOMMENDED_CSS_SWITCH: */
  vertical-align: middle;
  text-align: left;

  outline: none;
  border: none;
  width: v-bind(WIDTH);
  padding: v-bind(GAP);
  border-radius: 9999px;
  background-color: #aaa;
  transition: background-color 166ms ease-out;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #111;
  }

  &[data-state="checked"] {
    background-color: crimson;
    border-color: crimson;
  }

  &[data-disabled] { opacity: 0.5 }
}

.switch-thumb {
  /* RECOMMENDED_CSS_SWITCH_THUMB */
  /* ensures thumb is sizeable/can receive vertical margins */
  display: inline-block;
  /* ensures thumb is vertically centered */
  vertical-align: middle;

  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 9999px;
  transition: transform 166ms ease-out;
  &[data-state="checked"] {
    transform: translateX(calc(v-bind(WIDTH) - v-bind(GAP) * 2 - v-bind(THUMB_WIDTH)));
  }
}
.switch-attr-styles {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state="unchecked"] { border-color: red }
  &[data-state="checked"] { border-color: green }
  &[data-state="indeterminate"] { border-color: purple }
  &[data-disabled] { border-style: dashed }
  &:disabled { opacity: 0.5 }
}
</style>
