<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type MenubarRootEmits, type MenubarRootProps, useMenuvarRoot } from './MenubarRoot.ts'

defineOptions({
  name: 'MenubarRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenubarRootProps>(), {
  value: undefined,
  loop: true,
  defaultValue: '',
})
const emit = defineEmits<MenubarRootEmits>()

const menuvarRoot = useMenuvarRoot({
  value() {
    return props.value
  },
  onUpdateValue(value) {
    emit('update:value', value)
  },
  defaultValue: props.defaultValue,
  loop: props.loop,
  dir() {
    return props.dir
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(menuvarRoot.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
