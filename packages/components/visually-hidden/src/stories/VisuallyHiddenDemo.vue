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
  <button>
    <OkuVisuallyHidden>Save the file</OkuVisuallyHidden>
    <span aria-hidden>💾</span>
  </button>
</template>
