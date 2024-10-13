<script setup lang="ts">
import { type MenuSubContentProps, useMenuSubContent } from './MenuSubContent.ts'
import MenuSubContentImpl from './MenuSubContentImpl.vue'

defineOptions({
  name: 'MenuSubContent',
})

const props = defineProps<MenuSubContentProps>()

const menuContent = useMenuSubContent(props)
</script>

<template>
  <MenuSubContentImpl v-if="menuContent.isPresent.value">
    <slot />
  </MenuSubContentImpl>
</template>
