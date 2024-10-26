<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import { convertPropsToHookProps } from '../shared/index.ts'
import { DEFAULT_DROPDOWN_MENU_ROOT_PROPS, type DropdownMenuRootEmits, type DropdownMenuRootProps, useDropdownMenuRoot } from './DropdownMenuRoot.ts'

defineOptions({
  name: 'DropdownMenuRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownMenuRootProps>(), DEFAULT_DROPDOWN_MENU_ROOT_PROPS)
const emit = defineEmits<DropdownMenuRootEmits>()

useDropdownMenuRoot(convertPropsToHookProps(
  props,
  ['open', 'dir'],
  (): Required<EmitsToHookProps<DropdownMenuRootEmits>> => ({
    onUpdateOpen(open) {
      emit('update:open', open)
    },
  }),
))
</script>

<template>
  <slot />
</template>
