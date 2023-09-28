<script setup lang="ts">
import type { VisuallyHiddenProps } from '@oku-ui/visually-hidden'
import { OkuVisuallyHidden } from '@oku-ui/visually-hidden'

export interface IVisuallyHiddenProps extends VisuallyHiddenProps {
  template?: '#1'
  allshow?: boolean
}

defineProps<IVisuallyHiddenProps>()
</script>

<template>
  <button class="bg-gray-200 w-10 h-10">
    <OkuVisuallyHidden>Save the file</OkuVisuallyHidden>
    <span aria-hidden>💾</span>
  </button>
</template>
