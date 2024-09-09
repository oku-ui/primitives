<script setup lang="ts">
import { shallowRef } from 'vue'
import { useForwardElement } from '../hooks/index.ts'
import { usePresence } from '../presence/usePresence.ts'
import PopoverContentModal from './PopoverContentModal.vue'
import PopoverContentNonModal from './PopoverContentNonModal.vue'
import { usePopoverContext } from './PopoverRoot.ts'
import type { PopoverContentProps } from './PopoverContent.ts'

defineOptions({
  name: 'PopoverContent',
})

const props = defineProps<PopoverContentProps>()

const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const context = usePopoverContext('PopoverContent')

const isPresent = usePresence($el, () => props.forceMount || context.open.value)

const Comp = context.modal ? PopoverContentModal : PopoverContentNonModal
</script>

<template>
  <Comp v-if="isPresent" :ref="forwardElement">
    <slot />
  </Comp>
</template>
