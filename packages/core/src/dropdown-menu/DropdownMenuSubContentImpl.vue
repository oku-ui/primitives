<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, type EmitsToHookProps, normalizeAttrs } from '../shared/index.ts'
import {
  DEFAULT_DROPDOWN_MENU_SUB_CONTENT_IMPL_PROPS,
  type DropdownMenuSubContentImplEmits,
  type DropdownMenuSubContentImplProps,
  useDropdownMenuSubContentImpl,
} from './DropdownMenuSubContentImpl.ts'

defineOptions({
  name: 'DropdownMenuSubContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownMenuSubContentImplProps>(), DEFAULT_DROPDOWN_MENU_SUB_CONTENT_IMPL_PROPS)
const emit = defineEmits<DropdownMenuSubContentImplEmits>()

const menuSubContentImpl = useDropdownMenuSubContentImpl(convertPropsToHookProps(
  props,
  ['collisionBoundary'],
  (): Required<EmitsToHookProps<DropdownMenuSubContentImplEmits>> => ({
    onEscapeKeydown(event) {
      emit('escapeKeydown', event)
    },
    onPointerdownOutside(event) {
      emit('pointerdownOutside', event)
    },
    onFocusOutside(event) {
      emit('focusOutside', event)
    },
    onInteractOutside(event) {
      emit('interactOutside', event)
    },
  }),
))
</script>

<template>
  <div v-bind="menuSubContentImpl.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(menuSubContentImpl.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
