<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, type EmitsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_MENU_RADIO_ITEM_PROPS, type MenuRadioItemEmits, type MenuRadioItemProps, useMenuRadioItem } from './MenuRadioItem.ts'

defineOptions({
  name: 'MenuRadioItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuRadioItemProps>(), DEFAULT_MENU_RADIO_ITEM_PROPS)

const emit = defineEmits<MenuRadioItemEmits>()

const menuRadioItem = useMenuRadioItem(convertPropsToHookProps(
  props,
  ['disabled'],
  (): Required<EmitsToHookProps<MenuRadioItemEmits>> => ({
    onSelect(event) {
      emit('select', event)
    },
  }),
))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(menuRadioItem.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
