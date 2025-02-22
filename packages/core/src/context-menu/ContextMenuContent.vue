<script setup lang="ts">
import type { ContextMenuContenttProps } from './ContextMenuContent.ts'
import { convertPropsToHookProps } from '../shared/index.ts'
import { DEFAULT_CONTEXT_MENU_CONTENT_PROPS, useContextMenuContent } from './ContextMenuContent.ts'
import ContextMenuContentImpl from './ContextMenuContentImpl.vue'

defineOptions({
  name: 'ContextMenuContent',
})

const props = withDefaults(defineProps<ContextMenuContenttProps>(), DEFAULT_CONTEXT_MENU_CONTENT_PROPS)

const menuContent = useContextMenuContent(convertPropsToHookProps(props))
</script>

<template>
  <ContextMenuContentImpl v-if="menuContent.isPresent.value">
    <slot />
  </ContextMenuContentImpl>
</template>
