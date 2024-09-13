<script setup lang="ts">
import type { DialogTriggerEmits, DialogTriggerProps } from './DialogTrigger.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useDialogContext } from './DialogRoot.ts'
import { getState } from './utils.ts'

defineOptions({
  name: 'DialogTrigger',
})

withDefaults(defineProps<DialogTriggerProps>(), {
  as: 'button',
})
const emit = defineEmits<DialogTriggerEmits>()

const context = useDialogContext('DialogTrigger')

function triggerRef(nodeRef: any) {
  const node = nodeRef ? nodeRef.$el : undefined
  context.triggerRef.current = node
}

const onClick = composeEventHandlers<MouseEvent>((event) => {
  emit('click', event)
}, context.onOpenToggle)
</script>

<template>
  <Primitive
    :ref="triggerRef"
    :as="as"
    type="button"
    aria-haspopup="dialog"
    :aria-expanded="context.open.value || false"
    :aria-controls="context.open.value ? context.contentId : undefined"
    :data-state="getState(context.open.value)"
    @click="onClick"
  >
    <slot />
  </Primitive>
</template>
