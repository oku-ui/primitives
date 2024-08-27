<script setup lang="ts">
import { Dialog } from '../dialog/index.ts'

defineOptions({
  name: 'AlertDialogRoot',
})
</script>

<template>
  <Dialog :modal="true">
    <slot />
  </Dialog>
</template>
