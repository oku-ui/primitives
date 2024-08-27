<script setup lang="ts">
import { DialogRoot } from '../dialog/index.ts'

defineOptions({
  name: 'AlertDialogRoot',
})
</script>

<template>
  <DialogRoot :modal="true">
    <slot />
  </DialogRoot>
</template>
