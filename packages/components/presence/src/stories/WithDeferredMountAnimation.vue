<script setup lang="ts">
import type { VNodeRef } from 'vue'
import { ref, watch } from 'vue'
import { OkuPresence } from '../presence'
import Toggles from './Toggles.vue'

const open = ref(false)
const elementRef = ref<VNodeRef>()

const timerRef = ref(0)
const animate = ref(false)

watch(open, () => {
  if (open.value) {
    timerRef.value = window.setTimeout(() => animate.value = true, 150)
  }
  else {
    animate.value = false
    window.clearTimeout(timerRef.value)
  }
})
</script>

<template>
  <p>
    Deferred animation should unmount correctly when toggled. Content will flash briefly while
    we wait for animation to be applied.
  </p>
  <Toggles v-model:open="open" :node-ref="elementRef" />
  <OkuPresence :present="open">
    <div
      ref="elementRef"
      :class="animate ? 'presence-mountAnimationClass' : undefined"
      :data-state="open ? 'open' : 'closed'"
    >
      Content
    </div>
  </OkuPresence>
</template>
