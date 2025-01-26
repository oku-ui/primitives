<script setup lang="ts">
import type { AlertDialogContentProps } from './AlertDialogContent.ts'
import { convertPropsToHookProps } from '../shared/index.ts'
import { DEFAULT_ALERT_DIALOG_CONTENT_PROPS, useAlertDialogContent } from './AlertDialogContent.ts'
import AlertDialogContentImpl from './AlertDialogContentImpl.vue'

defineOptions({
  name: 'AlertDialogContent',
})

const props = withDefaults(defineProps<AlertDialogContentProps>(), DEFAULT_ALERT_DIALOG_CONTENT_PROPS)

const dialogContent = useAlertDialogContent(convertPropsToHookProps(props))
</script>

<template>
  <AlertDialogContentImpl v-if="dialogContent.isPresent.value">
    <slot />
  </AlertDialogContentImpl>
</template>
