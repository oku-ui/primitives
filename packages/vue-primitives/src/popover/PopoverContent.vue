<script setup lang="ts">
import type { PopoverContentProps } from './PopoverContent.ts'
import { usePopperContext } from '../popper/index.ts'
import { usePresence } from '../presence/index.ts'
import PopoverContentModal from './PopoverContentModal.vue'
import PopoverContentNonModal from './PopoverContentNonModal.vue'
import { usePopoverContext } from './PopoverRoot.ts'

defineOptions({
  name: 'PopoverContent',
})

const props = defineProps<PopoverContentProps>()

const context = usePopoverContext('PopoverContent')
const popperContext = usePopperContext('PopoverContent')

const isPresent = usePresence(popperContext.content, () => props.forceMount || context.open.value)

const Comp = context.modal ? PopoverContentModal : PopoverContentNonModal
</script>

<template>
  <Comp v-if="isPresent">
    <slot />
  </Comp>
</template>
