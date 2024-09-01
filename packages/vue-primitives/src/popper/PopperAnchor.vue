<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import Primitive from '../primitive/Primitive.vue'
import { useForwardElement } from '../hooks/index.ts'
import { usePopperContext } from './PopperRoot.ts'
import type { PopperAnchorElement, PopperAnchorProps } from './PopperAnchor'

defineOptions({
  name: 'PopperAnchor',
})

const props = defineProps<PopperAnchorProps>()

const context = usePopperContext('PopperAnchor')

const $el = shallowRef<PopperAnchorElement>()
const forwardElement = useForwardElement($el)

onMounted(() => {
  context.onAnchorChange(props.virtualRef?.current || $el.value)
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
