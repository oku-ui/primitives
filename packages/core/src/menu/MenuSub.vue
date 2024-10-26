<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import { convertPropsToHookProps } from '../shared/index.ts'
import { DEFAULT_MENU_SUB_PROPS, type MenuSubEmits, type MenuSubProps, useMenuSub } from './MenuSub.ts'

defineOptions({
  name: 'MenuSub',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuSubProps>(), DEFAULT_MENU_SUB_PROPS)
const emit = defineEmits<MenuSubEmits>()

useMenuSub(convertPropsToHookProps(
  props,
  ['open'],
  (): Required<EmitsToHookProps<MenuSubEmits>> => ({
    onUpdateOpen(open) {
      emit('update:open', open)
    },
  }),
))
</script>

<template>
  <slot />
</template>
