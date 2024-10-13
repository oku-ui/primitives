<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type MenuCheckboxItemEmits, type MenuCheckboxItemProps, useMenuCheckboxItem } from './MenuCheckboxItem.ts'

defineOptions({
  name: 'MenuCheckboxItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuCheckboxItemProps>(), {
  checked: false,
  disabled: false,
})

const emit = defineEmits<MenuCheckboxItemEmits>()

const menuCheckboxItem = useMenuCheckboxItem({
  checked() {
    return props.checked
  },
  onUpdateChecked(checked) {
    emit('update:checked', checked)
  },
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
  <Primitive v-bind="normalizeAttrs(menuCheckboxItem.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
