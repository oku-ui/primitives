<script setup lang="ts">
import { shallowRef, watchEffect } from 'vue'
import { usePresence } from '../index.ts'
import Toggles from './Toggles.vue'
import './styles.css'

let t = 0
const open = shallowRef(false)
function setOpen(value: boolean) {
  open.value = value
}
const animate = shallowRef(false)
function setAnimate(value: boolean) {
  animate.value = value
}

watchEffect(() => {
  if (open.value) {
    const timer = window.setTimeout(() => setAnimate(true), 150)
    t = timer
  }
  else {
    setAnimate(false)
    clearTimeout(t)
  }
})

const elRef = shallowRef<HTMLElement>()

const isPresent = usePresence(elRef, open)

function getNode() {
  return elRef
}
</script>

<template>
  <p>
    Deferred animation should unmount correctly when toggled. Content will flash briefly while
    we wait for animation to be applied.
  </p>
  <Toggles :get-node="getNode" :open="open" @open-change="setOpen" />

  <div v-if="isPresent" ref="elRef" :class="animate ? 'present_mountAnimation' : undefined">
    Content
  </div>
</template>
