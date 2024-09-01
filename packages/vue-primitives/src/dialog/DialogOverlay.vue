<script setup lang="ts">
import { shallowRef } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { usePresence } from '../presence/index.ts'
import { useForwardElement } from '../hooks/index.ts'
import { useDialogContext } from './DialogRoot.ts'
import type { DialogOverlayProps } from './DialogOverlay.ts'
import { getState } from './utils.ts'

defineOptions({
  name: 'DialogOverlay',
})

const props = defineProps<DialogOverlayProps>()

const context = useDialogContext('DialogOverlay')

const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const isPresent = usePresence($el, () => props.forceMount || context.open.value)
</script>

<template>
  <Primitive
    v-if="isPresent"
    :ref="forwardElement"
    :data-state="getState(context.open.value)"
    style="pointer-events: auto"
  >
    <slot />
  </Primitive>
</template>
