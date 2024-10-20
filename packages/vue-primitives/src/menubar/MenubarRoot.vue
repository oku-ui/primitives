<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, type EmitsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_MENUBAR_ROOT_PROPS, type MenubarRootEmits, type MenubarRootProps, useMenuvarRoot } from './MenubarRoot.ts'

defineOptions({
  name: 'MenubarRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenubarRootProps>(), DEFAULT_MENUBAR_ROOT_PROPS)
const emit = defineEmits<MenubarRootEmits>()

const menuvarRoot = useMenuvarRoot(convertPropsToHookProps(
  props,
  ['value', 'dir'],
  (): Required<EmitsToHookProps<MenubarRootEmits>> => ({
    onUpdateValue(value) {
      emit('update:value', value)
    },
  }),
))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(menuvarRoot.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
