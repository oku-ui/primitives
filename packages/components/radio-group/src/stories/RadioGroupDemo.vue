<script setup lang="ts">
import Styled from './Styled.vue'
import Controlled from './Controlled.vue'
import Unset from './Unset.vue'
import WithinForm from './WithinForm.vue'
import Animated from './Animated.vue'
import Chromatic from './Chromatic.vue'

withDefaults(defineProps<IRadioGroupProps>(), {})

export interface IRadioGroupProps {
  template?: 'Styled' | 'Controlled' | 'Unset' | 'WithinForm' | 'Animated' | 'Chromatic'
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

    <template v-if="template === 'Unset' || allshow">
      <Unset />
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
/* .radio-group {} */

.radio-group-item {
  /* RECOMMENDED_CSS_RADIO_GROUP_ITEM */
  /* better default alignment */
  vertical-align: middle;

  width: 30px;
  height: 30px;
  display: inline-grid;
  padding: 0px;
  place-items: center;
  border: 1px solid #aaa;
  border-radius: 9999px;

  &:focus {
    outline: none;
    border-color: crimson;
    box-shadow: 0 0 0 1px crimson;
  }

  &[data-disabled] {
    opacity: 0.5,
  }
}

.radio-group-indicator {
  width: 18px;
  height: 18px;
  background-color: crimson;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
}

@keyframes radio-group-fade-in {
  from { opacity: 0 }
  to { opacity: 1 }
}

@keyframes radio-group-fade-out {
  from { opacity: 1 }
  to { opacity: 0 }
}

.radio-group-animated-indicator {
  &[data-state="checked"] {
    animation: radio-group-fade-in 300ms ease-out;
  }
  &[data-state="unchecked"] {
    animation: radio-group-fade-out 300ms ease-in;
  }
}

.radio-group-attr-styles  {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[tabindex="0"] { box-shadow: inset 0 0 0 2px yellow }

  &:disabled { opacity: 0.5 }
  &[data-disabled] { border-style: dashed }

  &[data-state="unchecked"] { border-color: red }
  &[data-state="checked"] { border-color: green }
}
</style>
