<script setup lang="ts">
import { convertPropsToHookProps } from '../shared/convertPropsToHookProps.ts'
import { type MenubarMenuProps, useMenubarMenu } from './MenubarMenu.ts'

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
