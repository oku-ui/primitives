<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { DropdownMenuSubEmits, DropdownMenuSubProps } from './DropdownMenuSub.ts'
import { convertPropsToHookProps } from '../shared/index.ts'
import { DEFAULT_DROPDOWN_MENU_SUB_PROPS, useDropdownMenuSub } from './DropdownMenuSub.ts'

defineOptions({
  name: 'DropdownMenuSub',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownMenuSubProps>(), DEFAULT_DROPDOWN_MENU_SUB_PROPS)
const emit = defineEmits<DropdownMenuSubEmits>()

useDropdownMenuSub(convertPropsToHookProps(
  props,
  ['open'],
  (): Required<EmitsToHookProps<DropdownMenuSubEmits>> => ({
    onUpdateOpen(open) {
      emit('update:open', open)
    },
  }),
))
</script>

<template>
  <slot />
</template>
