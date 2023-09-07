<script setup lang="ts">
import Styled from './Styled.vue'

export interface OkuDialogProps {
  template: 'Styled' | 'NonModal' | 'Controlled' | 'FocusTrap' | 'CustomFocus' | 'NoEscapeDismiss' | 'NoPointerDownOutsideDismiss'
  allshow?: boolean
}

withDefaults(defineProps<OkuDialogProps>(), {
  template: 'Styled',
})
</script>

<template>
  <div v-if="template === 'Styled' || allshow" class="flex flex-col w-full">
    <Styled />
  </div>
  <!-- <div v-if="template === 'NonModal' || allshow" class="flex flex-col w-full">
    <OnValueCommit />
  </div>
  <div v-if="template === 'Controlled' || allshow" class="flex flex-col w-full">
    <Vertical />
  </div> -->
</template>
