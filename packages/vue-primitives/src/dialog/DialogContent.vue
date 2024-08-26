<script setup lang="ts">
import { shallowRef } from 'vue'
import { forwardRef } from '../utils/vue.ts'
import { usePresence } from '../presence/usePresence.ts'
import { useDialogContext } from './Dialog.ts'
import DialogContentModal from './DialogContentModal.vue'
import DialogContentNonModal from './DialogContentNonModal.vue'
import type { DialogContentProps } from './DialogContent.ts'

defineOptions({
  name: 'DialogContent',
})

const props = defineProps<DialogContentProps>()

const $el = shallowRef<HTMLElement>()
const forwardedRef = forwardRef($el)

const context = useDialogContext('DialogContent')

const isPresent = usePresence($el, () => props.forceMount || context.open.value)

const Comp = context.modal ? DialogContentModal : DialogContentNonModal
</script>

<template>
  <Comp
    v-if="isPresent"
    :ref="forwardedRef"
  >
    <slot />
  </Comp>
</template>
