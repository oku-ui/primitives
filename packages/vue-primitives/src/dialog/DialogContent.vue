<script setup lang="ts">
import { shallowRef } from 'vue'
import { useForwardElement } from '../hooks/index.ts'
import { usePresence } from '../presence/usePresence.ts'
import { useDialogContext } from './DialogRoot.ts'
import DialogContentModal from './DialogContentModal.vue'
import DialogContentNonModal from './DialogContentNonModal.vue'
import type { DialogContentProps } from './DialogContent.ts'

defineOptions({
  name: 'DialogContent',
})

const props = defineProps<DialogContentProps>()

const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const context = useDialogContext('DialogContent')

const isPresent = usePresence($el, () => props.forceMount || context.open.value)

const Comp = context.modal ? DialogContentModal : DialogContentNonModal
</script>

<template>
  <Comp
    v-if="isPresent"
    :ref="forwardElement"
  >
    <slot />
  </Comp>
</template>
