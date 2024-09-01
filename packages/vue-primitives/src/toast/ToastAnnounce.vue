<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { Portal } from '../portal/index.ts'
import { VisuallyHidden } from '../visually-hidden/index.ts'
import { useToastProviderContext } from './index.ts'
import { useNextFrame } from './utils.ts'

defineOptions({
  name: 'ToastAnnounce',
  inheritAttrs: false,
})

const context = useToastProviderContext('ToastAnnounce')
const renderAnnounceText = shallowRef(false)
const isAnnounced = shallowRef(false)

let timer: number | undefined
let clear: () => void

onMounted(() => {
  timer = window.setTimeout(() => {
    isAnnounced.value = true
  }, 1000)

  // render text content in the next frame to ensure toast is announced in NVDA
  clear = useNextFrame(() => {
    renderAnnounceText.value = true
  })
})

onBeforeUnmount(() => {
  window.clearTimeout(timer)
  clear?.()
})
</script>

<template>
  <Portal v-if="!isAnnounced">
    <VisuallyHidden
      role="status"
      aria-atomic
      v-bind="$attrs"
    >
      <template v-if="renderAnnounceText">
        {{ context.label }} <slot />
      </template>
    </VisuallyHidden>
  </Portal>
</template>
