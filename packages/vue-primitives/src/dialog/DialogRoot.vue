


<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/typeUtils.ts'
import { convertPropsToHookProps } from '../shared/convertPropsToHookProps.ts'
import {
  DEFAULT_DIALOG_ROOT_PROPS,
  type DialogRootEmits,
  type DialogRootProps,
  useDialogRoot,
} from './DialogRoot.ts'

defineOptions({
  name: 'DialogRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DialogRootProps>(), DEFAULT_DIALOG_ROOT_PROPS)

const emit = defineEmits<DialogRootEmits>()

useDialogRoot(convertPropsToHookProps(
  props,
  ['open'],
  (): Required<EmitsToHookProps<DialogRootEmits>> => ({
    onUpdateOpen(open) {
      emit('update:open', open)
    },
  }),
))
</script>

<template>
  <slot />
</template>
