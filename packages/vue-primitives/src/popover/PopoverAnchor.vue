<script setup lang="ts">
import type { PopoverAnchorProps } from './PopoverAnchor.ts'
import { onBeforeUnmount, onMounted } from 'vue'
import { useForwardElement } from '../hooks/useForwardElement.ts'
import { useRef } from '../hooks/useRef.ts'
import { usePopperContext } from '../popper/index.ts'
import { Primitive } from '@oku-ui/primitive'
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
  popperContext.onAnchorChange(props.virtualRef?.current || elRef.current)
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
