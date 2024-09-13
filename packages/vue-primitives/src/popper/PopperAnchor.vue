<script setup lang="ts">
import type { PopperAnchorElement, PopperAnchorProps } from './PopperAnchor'
import { onMounted } from 'vue'
import { useForwardElement, useRef } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { usePopperContext } from './PopperRoot.ts'

defineOptions({
  name: 'PopperAnchor',
})

const props = defineProps<PopperAnchorProps>()

const context = usePopperContext('PopperAnchor')

const elRef = useRef<PopperAnchorElement>()
const forwardElement = useForwardElement(elRef)

onMounted(() => {
  context.onAnchorChange(props.virtualRef?.current || elRef.current)
})
</script>

<template>
  <Primitive
    v-if="!virtualRef"
    :ref="forwardElement"
  >
    <slot />
  </Primitive>
</template>
