<script setup lang="ts">
import { convertPropsToHookProps } from '../shared/index.ts'
import { type ContextMenuSubContentProps, DEFAULT_CONTEXT_MENU_SUB_CONTENT_PROPS, useContextMenuSubContent } from './ContextMenuSubContent.ts'
import ContextMenuSubContentImpl from './ContextMenuSubContentImpl.vue'

defineOptions({
  name: 'ContextMenuSubContent',
})

const props = withDefaults(defineProps<ContextMenuSubContentProps>(), DEFAULT_CONTEXT_MENU_SUB_CONTENT_PROPS)

const menuContent = useContextMenuSubContent(convertPropsToHookProps(props))
</script>

<template>
  <ContextMenuSubContentImpl v-if="menuContent.isPresent.value">
    <slot />
  </ContextMenuSubContentImpl>
</template>
