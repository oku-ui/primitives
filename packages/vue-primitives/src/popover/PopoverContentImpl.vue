<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, type EmitsToHookProps, normalizeAttrs } from '../shared/index.ts'
import {
  DEFAULT_POPOVER_CONTENT_IMPL_PROPS,
  type PopoverContentImplEmits,
  type PopoverContentImplProps,
  usePopoverContentImpl,
} from './PopoverContentImpl.ts'

defineOptions({
  name: 'PopoverContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopoverContentImplProps>(), DEFAULT_POPOVER_CONTENT_IMPL_PROPS)

const emit = defineEmits<PopoverContentImplEmits>()

const popoverContentImpl = usePopoverContentImpl(convertPropsToHookProps(props, [
  'collisionBoundary',
  'dir',
], (): Required<EmitsToHookProps<PopoverContentImplEmits>> => ({
  onOpenAutoFocus(event) {
    emit('openAutoFocus', event)
  },
  onCloseAutoFocus(event) {
    emit('closeAutoFocus', event)
  },
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
})))
</script>

<template>
  <div v-bind="popoverContentImpl.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(popoverContentImpl.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
