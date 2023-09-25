<script setup lang="ts">
import type { VNodeRef } from 'vue'
import { ref } from 'vue'
import { OkuPresence } from '../presence'
import Toggles from './Toggles.vue'

const open = ref(false)
const elementRef = ref<VNodeRef>()
</script>

<template>
  <Toggles v-model:open="open" :node-ref="elementRef" />
  <OkuPresence :present="open">
    <div ref="elementRef" class="presence-openAndCloseAnimation" :data-state="open ? 'open' : 'closed'">
      Content
    </div>
  </OkuPresence>
</template>
