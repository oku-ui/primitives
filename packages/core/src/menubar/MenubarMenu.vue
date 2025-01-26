<script setup lang="ts">
import type { MenubarMenuProps } from './MenubarMenu.ts'
import { convertPropsToHookProps } from '../shared/index.ts'
import { useMenubarMenu } from './MenubarMenu.ts'

defineOptions({
  name: 'MenubarMenu',
  inheritAttrs: false,
})

const props = defineProps<MenubarMenuProps>()

useMenubarMenu(convertPropsToHookProps(props))
</script>

<template>
  <slot />
</template>
