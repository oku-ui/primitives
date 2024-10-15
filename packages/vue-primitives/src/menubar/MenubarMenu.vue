<script setup lang="ts">
import { type MenubarMenuProps, useMenubarMenu } from './MenubarMenu.ts'

defineOptions({
  name: 'MenubarMenu',
  inheritAttrs: false,
})

const props = defineProps<MenubarMenuProps>()

useMenubarMenu({
  value: props.value,
})
</script>

<template>
  <slot />
</template>
