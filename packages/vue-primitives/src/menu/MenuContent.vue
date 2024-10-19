<script setup lang="ts">
import { convertPropsToHookProps } from '../shared/convertPropsToHookProps.ts'
import { DEFAULT_MENU_CONTENT_PROPS, type MenuContentProps, useMenuContent } from './MenuContent.ts'
import MenuContentImpl from './MenuContentImpl.vue'

defineOptions({
  name: 'MenuContent',
})

const props = withDefaults(defineProps<MenuContentProps>(), DEFAULT_MENU_CONTENT_PROPS)

const menuContent = useMenuContent(convertPropsToHookProps(props))
</script>

<template>
  <MenuContentImpl v-if="menuContent.isPresent.value">
    <slot />
  </MenuContentImpl>
</template>
