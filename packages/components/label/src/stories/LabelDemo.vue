<script setup lang="ts">
import Styled from './Styled.vue'
import WithControl from './WithControl.vue'
import Control from './Control.vue'

withDefaults(defineProps<ILabelProps>(), {})

export interface ILabelProps {
  template?: 'Styled' | 'WithControl'
  allshow?: boolean
}
</script>

<template>
  <div>
    <template v-if="template === 'Styled' || allshow">
      <Styled />
    </template>

    <template v-if="template === 'WithControl' || allshow">
      <WithControl />
    </template>
  </div>
</template>

<style>
.label {
  /* RECOMMENDED_CSS_LABEL */
  /* ensures it can receive vertical margins */
  display: inline-block;
  /* better default alignment */
  vertical-align: middle;
  /* mimics default `label` tag (as we render a `span`) */
  cursor: default;

  display: inline-block;
  border: 1px solid gainsboro;
  padding: 10px;
}

.label-control {
  display: inline-flex;
  border: 1px solid gainsboro;
  padding: 10px;
  vertical-align: middle;
  margin: 0px 10px;

  &:hover {
    background-color: red;
  }
}
</style>
