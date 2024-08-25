<script setup lang="ts">
import { shallowRef } from 'vue'
import { forwardRef } from '../utils/vue.ts'
import { usePresence } from '../presence/usePresence.ts'
import { usePopoverContext } from './Popover.ts'
import type { PopoverContentProps, PopoverContentTypeEmits } from './PopoverContent.ts'
import PopoverContentModal from './PopoverContentModal.vue'
import PopoverContentNonModal from './PopoverContentNonModal.vue'

defineOptions({
  name: 'PopoverContent',
})

const props = defineProps<PopoverContentProps>()
const emit = defineEmits<PopoverContentTypeEmits>()

const $el = shallowRef<HTMLElement>()
const forwardedRef = forwardRef($el)

const context = usePopoverContext('PopoverContent')

const isPresent = usePresence($el, () => props.forceMount || context.open.value)

const Comp = context.modal() ? PopoverContentModal : PopoverContentNonModal

defineExpose({
  $el,
})
</script>

<template>
  <Comp
    v-if="isPresent"
    :ref="forwardedRef"
    @open-auto-focus="emit('openAutoFocus', $event)"
    @close-auto-focus="emit('closeAutoFocus', $event)"
    @escape-keydown="emit('escapeKeydown', $event)"
    @pointerdown-outside="emit('pointerdownOutside', $event)"
    @focus-outside="emit('focusOutside', $event)"
    @interact-outside="emit('interactOutside', $event)"
    @dismiss="emit('dismiss')"
  >
    <slot />
  </Comp>
</template>
