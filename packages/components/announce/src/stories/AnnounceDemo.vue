<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { OkuVisuallyHidden } from '@oku-ui/visually-hidden'
import { OkuAnnounce } from '@oku-ui/announce'

export interface OkuAnnounceProps {
  template: '#1' | '#2' | '#3'
  allshow?: boolean
}

withDefaults(defineProps<OkuAnnounceProps>(), {
  template: '#1',
})

const count = ref(0)

function add() {
  count.value++
}

function sub() {
  count.value--
}

// ---demo2---
const friendIsOnline = ref(false)
watchEffect(() => {
  const timer = window.setInterval(() => {
    friendIsOnline.value = !friendIsOnline.value
  }, 6000)
  return () => window.clearInterval(timer)
})
</script>

<template>
  <div>
    <template v-if="template === '#1'">
      <button v-if="count > 0" class="mr-2" @click="sub">
        remove
      </button>
      <button @click="add">
        add
      </button>
      <OkuAnnounce v-for="(item, index) in [...Array(count)]" :key="item">
        Message {{ index }}
      </OkuAnnounce>
    </template>
    <template v-if="template === '#2'">
      <OkuVisuallyHidden>
        <OkuAnnounce aria-relevant="all">
          Your friend is {{ friendIsOnline ? 'online' : 'offline' }}
        </OkuAnnounce>
      </OkuVisuallyHidden>
      <span
        :style="{
          display: 'inline-block',
          width: '10px',
          height: '10px',
          background: friendIsOnline ? 'forestgreen' : 'crimson',
          borderRadius: '5px',
        }"
      />
      Friend status: {{ friendIsOnline ? 'Online' : 'Offline' }}
    </template>
  </div>
</template>
