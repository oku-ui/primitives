<script setup lang="ts">
import { shallowRef } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { usePresence } from '../presence/index.ts'
import { forwardRef } from '../utils/vue.ts'
import { useDialogContext } from './Dialog.ts'
import type { DialogOverlayProps } from './DialogOverlay.ts'
import { getState } from './utils.ts'

defineOptions({
  name: 'DialogOverlay',
})

const props = defineProps<DialogOverlayProps>()

const context = useDialogContext('DialogOverlay')

const $el = shallowRef<HTMLElement>()
const forwardedRef = forwardRef($el)

const isPresent = usePresence($el, () => props.forceMount || context.open.value)

defineExpose({
  $el,
})
</script>

<template>
  <Primitive
    v-if="isPresent"
    :ref="forwardedRef"
    :as="as"
    :as-child="asChild"
    :data-state="getState(context.open.value)"
    style="pointer-events: auto"
  >
    <slot />
  </Primitive>
</template>
