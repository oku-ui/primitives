<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, type EmitsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_MENU_CHECKBOX_ITEM_PROPS, type MenuCheckboxItemEmits, type MenuCheckboxItemProps, useMenuCheckboxItem } from './MenuCheckboxItem.ts'

defineOptions({
  name: 'MenuCheckboxItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuCheckboxItemProps>(), DEFAULT_MENU_CHECKBOX_ITEM_PROPS)

const emit = defineEmits<MenuCheckboxItemEmits>()

const menuCheckboxItem = useMenuCheckboxItem(convertPropsToHookProps(
  props,
  ['checked', 'disabled'],
  (): Required<EmitsToHookProps<MenuCheckboxItemEmits>> => ({
    onUpdateChecked(checked) {
      emit('update:checked', checked)
    },
    onSelect(event) {
      emit('select', event)
    },
  }),
))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(menuCheckboxItem.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
