<script setup lang="ts">
import { shallowRef } from 'vue'
import { usePresence } from '../index.ts'
import './styles.css'

const open = shallowRef(true)

function setOpen() {
  open.value = !open.value
}

const elRef = shallowRef<HTMLElement>()

const isPresent = usePresence(elRef, open)
</script>

<template>
  <button @click="setOpen">
    toggle
  </button>

  <div v-if="isPresent" ref="elRef">
    Content
  </div>
</template>
