<script setup lang="ts">
import Styled from './Styled.vue'
import OnValueCommit from './OnValueCommit.vue'
import Vertical from './Vertical.vue'

export interface OkuSliderProps {
  template: 'Styled' | 'OnValueCommit' | 'Vertical'
  allshow?: boolean
}

withDefaults(defineProps<OkuSliderProps>(), {
  template: 'Styled',
})
</script>

<template>
  <div v-if="template === 'Styled' || allshow" class="flex flex-col w-full">
    <Styled />
  </div>
  <div v-if="template === 'OnValueCommit' || allshow" class="flex flex-col w-full">
    <OnValueCommit />
  </div>
  <div v-if="template === 'Vertical' || allshow" class="flex flex-col w-full">
    <Vertical />
  </div>
</template>
