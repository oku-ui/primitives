<script setup lang="ts">
import {
  OkuHoverCard,
  OkuHoverCardArrow,
  OkuHoverCardContent,
  OkuHoverCardPortal,
  OkuHoverCardTrigger,
} from '@oku-ui/hover-card'
import { onBeforeUnmount, ref } from 'vue'
import CardContentPlaceholder from './CardContentPlaceholder.vue'

const open = ref(false)
const contentLoaded = ref(false)
const timerRef = ref(0)

function handleOpenChange(newOpen: any) {
  clearTimeout(timerRef.value)

  if (newOpen) {
    timerRef.value = window.setTimeout(() => {
      contentLoaded.value = true
    }, 500)
  }
  else {
    contentLoaded.value = false
  }

  open.value = newOpen
}

onBeforeUnmount(() => {
  clearTimeout(timerRef.value)
})
</script>

<template>
  <div style="padding: 50px; display: flex; justify-content: center">
    <OkuHoverCard v-model="open" @open-change="handleOpenChange(!open)">
      <OkuHoverCardTrigger href="/" class="hover_card_triggerClass">
        trigger
      </OkuHoverCardTrigger>
      <OkuHoverCardPortal>
        <OkuHoverCardContent class="hover_card_contentClass" :side-offset="5">
          <OkuHoverCardArrow class="hover_card_arrowClass" :width="20" :height="10" />
          <template v-if="contentLoaded">
            <CardContentPlaceholder />
          </template>
          <template v-else>
            Loading...
          </template>
        </OkuHoverCardContent>
      </OkuHoverCardPortal>
    </OkuHoverCard>
  </div>
</template>
