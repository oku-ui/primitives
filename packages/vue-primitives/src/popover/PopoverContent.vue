<script setup lang="ts">
import { shallowRef } from 'vue'
import { forwardRef } from '../utils/vue.ts'
import { usePresence } from '../presence/usePresence.ts'
import { usePopoverContext } from './Popover.ts'
import type { PopoverContentProps } from './PopoverContent.ts'
import PopoverContentModal from './PopoverContentModal.vue'
import PopoverContentNonModal from './PopoverContentNonModal.vue'

defineOptions({
  name: 'PopoverContent',
})

const props = defineProps<PopoverContentProps>()

const $el = shallowRef<HTMLElement>()
const forwardedRef = forwardRef($el)

const context = usePopoverContext('PopoverContent')

const isPresent = usePresence($el, () => props.forceMount || context.open.value)

const Comp = context.modal ? PopoverContentModal : PopoverContentNonModal

defineExpose({
  $el,
})
</script>

<template>
  <Comp
    v-if="isPresent"
    :ref="forwardedRef"
  >
    <slot />
  </Comp>
</template>
