<script setup lang="ts">
import { convertPropsToHookProps } from '../shared/index.ts'
import { DEFAULT_DIALOG_CONTENT_PROPS, type DialogContentProps, useDialogContent } from './DialogContent.ts'
import DialogContentImpl from './DialogContentImpl.vue'

defineOptions({
  name: 'DialogContent',
})

const props = withDefaults(defineProps<DialogContentProps>(), DEFAULT_DIALOG_CONTENT_PROPS)

const dialogContent = useDialogContent(convertPropsToHookProps(props))
</script>

<template>
  <DialogContentImpl v-if="dialogContent.isPresent.value">
    <slot />
  </DialogContentImpl>
</template>
