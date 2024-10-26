<script setup lang="ts">
import { convertPropsToHookProps } from '../shared/index.ts'
import { DEFAULT_DROPDOWN_MENU_SUB_CONTENT_PROPS, type DropdownMenuSubContentProps, useDropdownMenuSubContent } from './DropdownMenuSubContent.ts'
import DropdownMenuSubContentImpl from './DropdownMenuSubContentImpl.vue'

defineOptions({
  name: 'DropdownMenuSubContent',
})

const props = withDefaults(defineProps<DropdownMenuSubContentProps>(), DEFAULT_DROPDOWN_MENU_SUB_CONTENT_PROPS)

const menuContent = useDropdownMenuSubContent(convertPropsToHookProps(props))
</script>

<template>
  <DropdownMenuSubContentImpl v-if="menuContent.isPresent.value">
    <slot />
  </DropdownMenuSubContentImpl>
</template>
