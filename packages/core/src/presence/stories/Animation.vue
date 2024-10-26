<script setup lang="ts">
import { shallowRef } from 'vue'
import { usePresence } from '../index.ts'
import Toggles from './Toggles.vue'
import './styles.css'

defineOptions({
  inheritAttrs: false,
})

const open = shallowRef(false)

function setOpen(value: boolean) {
  open.value = value
}

const elRef = shallowRef<HTMLElement>()

const isPresent = usePresence(elRef, open)

function getNode() {
  return elRef
}
</script>

<template>
  <Toggles :open="open" :get-node="getNode" @open-change="setOpen" />

  <div v-if="isPresent" ref="elRef" v-bind="$attrs" :data-state="open ? 'open' : 'closed'">
    Content
  </div>
</template>
