<script setup lang="ts">
import { type MenuContentProps, useMenuContent } from './MenuContent.ts'
import MenuContentImpl from './MenuContentImpl.vue'

defineOptions({
  name: 'MenuContent',
})

const props = defineProps<MenuContentProps>()

const menuContent = useMenuContent(props)
</script>

<template>
  <MenuContentImpl v-if="menuContent.isPresent.value">
    <slot />
  </MenuContentImpl>
</template>
