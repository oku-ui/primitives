<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import { convertPropsToHookProps } from '../shared/index.ts'
import {
  DEFAULT_MENU_ROOT_PROPS,
  type MenuRootEmits,
  type MenuRootProps,
  useMenuRoot,
} from './MenuRoot.ts'

defineOptions({
  name: 'MenuRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<MenuRootProps>(), DEFAULT_MENU_ROOT_PROPS)

const emit = defineEmits<MenuRootEmits>()

useMenuRoot(convertPropsToHookProps(
  props,
  ['open', 'dir'],
  (): Required<EmitsToHookProps<MenuRootEmits>> => ({
    onUpdateOpen(open) {
      emit('update:open', open)
    },
  }),
))
</script>

<template>
  <slot />
</template>
