<script setup lang="ts">
import type { PopoverTriggerEmits, PopoverTriggerProps } from './PopoverTrigger.ts'
import { useComposedElements } from '../hooks/index.ts'
import { PopperAnchor } from '../popper/index.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { usePopoverContext } from './PopoverRoot.ts'
import { getState } from './utilts.ts'

defineOptions({
  name: 'PopoverTrigger',
})

withDefaults(defineProps<PopoverTriggerProps>(), {
  as: 'button',
})
const emit = defineEmits<PopoverTriggerEmits>()
const context = usePopoverContext('PopoverTrigger')

const composedElements = useComposedElements<HTMLButtonElement>((v) => {
  context.triggerRef.current = v
})

const onClick = composeEventHandlers<MouseEvent>((event) => {
  emit('click', event)
}, context.onOpenToggle)
</script>

<template>
  <component
    :is="context.hasCustomAnchor.value ? Primitive : PopperAnchor"
    :ref="composedElements"
    :as="as"
    type="button"
    aria-haspopup="dialog"
    :aria-expanded="context.open.value"
    :aria-controls="context.contentId"
    :data-state="getState(context.open.value)"
    @click="onClick"
  >
    <slot />
  </component>
</template>
