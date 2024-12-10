<script setup lang="ts">
import { Primitive } from '../primitive'
import { convertPropsToHookProps, type EmitsToHookProps, normalizeAttrs } from '../shared'
import { DEFAULT_SELECT_CONTENT_IMPL_PROPS, type SelectContetImplEmits, type SelectContetImplProps, useSelectContentImpl } from './SelectContentImpl'

defineOptions({
  name: 'SelectContentImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SelectContetImplProps>(), DEFAULT_SELECT_CONTENT_IMPL_PROPS)
const emit = defineEmits<SelectContetImplEmits>()

const selectContentImpl = useSelectContentImpl(
  convertPropsToHookProps(
    props,
    ['collisionBoundary', 'dir'],
    (): Required<EmitsToHookProps<SelectContetImplEmits>> => ({
      onUnmountAutoFocus(event) {
        emit('unmountAutoFocus', event)
      },
      onEscapeKeydown(event) {
        emit('escapeKeydown', event)
      },
      onPointerdownOutside(event) {
        emit('pointerdownOutside', event)
      },
    }),
  ),
)
</script>

<template>
  <div v-bind="selectContentImpl.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(selectContentImpl.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
