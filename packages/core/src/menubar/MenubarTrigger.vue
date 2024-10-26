<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_MENUBAR_TRIGGER_PROPS, type MenubarTriggerProps, useMenubarTrigger } from './MenubarTrigger.ts'

defineOptions({
  name: 'MenubarTrigger',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenubarTriggerProps>(), DEFAULT_MENUBAR_TRIGGER_PROPS)

const menubarTrigger = useMenubarTrigger(convertPropsToHookProps(props, ['disabled']))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(menubarTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
