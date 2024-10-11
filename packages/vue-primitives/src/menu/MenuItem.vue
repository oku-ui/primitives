<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type MenuItemEmits, type MenuItemProps, useMenuItem } from './MenuItem.ts'

defineOptions({
  name: 'MenuItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuItemProps>(), {
  disabled: false,
})
const emit = defineEmits<MenuItemEmits>()

const menuItem = useMenuItem({
  disabled() {
    return props.disabled
  },
  textValue: props.textValue,
  onSelect(event) {
    emit('select', event)
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(menuItem.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
