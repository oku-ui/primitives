<script setup lang="ts">
import { convertPropsToHookProps } from '../shared/index.ts'
import { DEFAULT_DROPDOWN_MENU_CONTENT_PROPS, type DropdownMenuContentProps, useDropdownMenuContent } from './DropdownMenuContent.ts'
import DropdownMenuContentImpl from './DropdownMenuContentImpl.vue'

defineOptions({
  name: 'DropdownMenuContent',
})

const props = withDefaults(defineProps<DropdownMenuContentProps>(), DEFAULT_DROPDOWN_MENU_CONTENT_PROPS)

const dropdownMenuContent = useDropdownMenuContent(convertPropsToHookProps(props))
</script>

<template>
  <DropdownMenuContentImpl v-if="dropdownMenuContent.isPresent.value">
    <slot />
  </DropdownMenuContentImpl>
</template>
