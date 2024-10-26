<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_MENU_SUB_TRIGGER_PROPS, type MenuSubTriggerProps, useMenuSubTrigger } from './MenuSubTrigger.ts'

defineOptions({
  name: 'MenuSubTrigger',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuSubTriggerProps>(), DEFAULT_MENU_SUB_TRIGGER_PROPS)

const menuSubTrigger = useMenuSubTrigger(convertPropsToHookProps(props, ['disabled']))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(menuSubTrigger.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
