<script setup lang="ts">
import Styled from './Styled.vue'

withDefaults(defineProps<ISeparatorProps>(), {})

export interface ISeparatorProps {
  template?: 'Styled'
  allshow?: boolean
}
</script>

<template>
  <div>
    <template v-if="template === 'Styled' || allshow">
      <Styled />
    </template>
  </div>
</template>

<style>
.separator {
  border: none;
  background-color: crimson;

  &[data-orientation="horizontal"] {
    height: 1px;
    width: 100%;
    margin: 20px 0px;
  }

  &[data-orientation="vertical"] {
    height: 100px;
    width: 1px;
    margin: 0px 20px;
  }
}
</style>
