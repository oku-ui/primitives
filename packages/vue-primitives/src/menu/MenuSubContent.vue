<script setup lang="ts">
import { convertPropsToHookProps } from '../shared/convertPropsToHookProps.ts'
import { DEFAULT_MENU_SUB_CONTENT_PROPS, type MenuSubContentProps, useMenuSubContent } from './MenuSubContent.ts'
import MenuSubContentImpl from './MenuSubContentImpl.vue'

defineOptions({
  name: 'MenuSubContent',
})

const props = withDefaults(defineProps<MenuSubContentProps>(), DEFAULT_MENU_SUB_CONTENT_PROPS)

const menuContent = useMenuSubContent(convertPropsToHookProps(props))
</script>

<template>
  <MenuSubContentImpl v-if="menuContent.isPresent.value">
    <slot />
  </MenuSubContentImpl>
</template>
