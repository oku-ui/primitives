<script setup lang="ts">
import { convertPropsToHookProps } from '../shared/index.ts'
import { DEFAULT_MENUBAR_SUB_CONTENT_PROPS, type MenubarSubContentProps, useMenubarSubContent } from './MenubarSubContent.ts'
import MenubarSubContentImpl from './MenubarSubContentImpl.vue'

defineOptions({
  name: 'MenubarSubContent',
})

const props = withDefaults(defineProps<MenubarSubContentProps>(), DEFAULT_MENUBAR_SUB_CONTENT_PROPS)

const menuContent = useMenubarSubContent(convertPropsToHookProps(props))
</script>

<template>
  <MenubarSubContentImpl v-if="menuContent.isPresent.value">
    <slot />
  </MenubarSubContentImpl>
</template>
