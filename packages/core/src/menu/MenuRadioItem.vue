<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { MenuRadioItemEmits, MenuRadioItemProps } from './MenuRadioItem.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_MENU_RADIO_ITEM_PROPS, useMenuRadioItem } from './MenuRadioItem.ts'

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
