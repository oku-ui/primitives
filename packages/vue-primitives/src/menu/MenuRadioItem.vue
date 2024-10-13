<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type MenuRadioItemEmits, type MenuRadioItemProps, useMenuRadioItem } from './MenuRadioItem.ts'

defineOptions({
  name: 'MenuRadioItem',
  inheritAttrs: false,
})

const props = defineProps<MenuRadioItemProps>()

const emit = defineEmits<MenuRadioItemEmits>()

const menuRadioItem = useMenuRadioItem({
  value: props.value,
  menuItemProps: {
    disabled() {
      return props.disabled
    },
    textValue: props.textValue,
    onSelect(event) {
      emit('select', event)
    },
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(menuRadioItem.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
