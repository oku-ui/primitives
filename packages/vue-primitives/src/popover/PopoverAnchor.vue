<script setup lang="ts">
import type { PopoverAnchorProps } from './PopoverAnchor.ts'
import { Primitive } from '@oku-ui/primitive'
import { onBeforeUnmount, onMounted } from 'vue'
import { useRef } from '../hooks/index.ts'
import { useForwardElement } from '../hooks/useForwardElement.ts'
import { usePopperContext } from '../popper/index.ts'
import { usePopoverContext } from './PopoverRoot.ts'

defineOptions({
  name: 'PopoverAnchor',
})

const props = defineProps<PopoverAnchorProps>()

const context = usePopoverContext('PopoverAnchor')
const popperContext = usePopperContext('PopperAnchor')

// COMP::PopperAnchor
const elRef = useRef<HTMLDivElement>()
const forwardElement = useForwardElement(elRef)

onMounted(() => {
  context.onCustomAnchorAdd()
  popperContext.onAnchorChange(props.virtualRef?.value || elRef.value)
})

onBeforeUnmount(() => {
  context.onCustomAnchorRemove()
})
</script>

<template>
  <Primitive v-if="!virtualRef" :ref="forwardElement">
    <slot />
  </Primitive>
</template>
