<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { PopperContentEmits, PopperContentProps } from './PopperContent.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import {
  DEFAULT_POPPER_CONTENT_PROPS,

  usePopperContent,
} from './PopperContent.ts'

defineOptions({
  name: 'PopperContent',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopperContentProps>(), DEFAULT_POPPER_CONTENT_PROPS)
const emit = defineEmits<PopperContentEmits>()

const popperContent = usePopperContent(convertPropsToHookProps(
  props,
  ['collisionBoundary', 'dir'],
  (): Required<EmitsToHookProps<PopperContentEmits>> => ({
    onPlaced() {
      emit('placed')
    },
  }),
))
</script>

<template>
  <div v-bind="popperContent.wrapperAttrs()">
    <Primitive v-bind="normalizeAttrs(popperContent.attrs([$attrs]))">
      <slot />
    </Primitive>
  </div>
</template>
