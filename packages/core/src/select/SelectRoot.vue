<script setup lang="ts">
import { convertPropsToHookProps, type EmitsToHookProps } from '../shared'
import { type SelectRootEmits, type SelectRootProps, useSelectRoot } from './SelectRoot'

defineOptions({
  name: 'SelectRoot',
  inheritAttrs: false,
})

const props = defineProps<SelectRootProps>()
const emit = defineEmits<SelectRootEmits>()

useSelectRoot(convertPropsToHookProps(
  props,
  ['value', 'open', 'dir', 'disabled', 'required', 'name'],
  (): Required<EmitsToHookProps<SelectRootEmits>> => ({
    onUpdateOpen(value) {
      emit('update:open', value)
    },
    onUpdateValue(value) {
      emit('update:value', value)
    },
  }),
))
</script>

<template>
  <slot />
</template>
