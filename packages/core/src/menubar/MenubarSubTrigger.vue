<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_MENUBAR_SUB_TRIGGER_PROPS, type MenubarSubTriggerProps, useMenubarSubTrigger } from './MenubarSubTrigger.ts'

defineOptions({
  name: 'MenubarSubTrigger',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenubarSubTriggerProps>(), DEFAULT_MENUBAR_SUB_TRIGGER_PROPS)

const menubarSubTrigger = useMenubarSubTrigger(convertPropsToHookProps(props, ['disabled']))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(menubarSubTrigger.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
