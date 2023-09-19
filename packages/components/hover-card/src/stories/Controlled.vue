<script setup lang="ts">
import {
  OkuHoverCard,
  OkuHoverCardArrow,
  OkuHoverCardContent,
  OkuHoverCardPortal,
  OkuHoverCardTrigger,
} from '@oku-ui/hover-card'
import { ref } from 'vue'
import CardContentPlaceholder from './CardContentPlaceholder.vue'

const open = ref(false)
</script>

<template>
  <button @click="open = !open">
    Toggle
  </button>

  <div style="padding: 50px; display: flex; justify-content: center">
    <OkuHoverCard :open="open" @open-change="open = !open">
      <OkuHoverCardTrigger href="/" class="hover_card_triggerClass">
        trigger
      </OkuHoverCardTrigger>
      <OkuHoverCardPortal>
        <OkuHoverCardContent class="hover_card_contentClass">
          <OkuHoverCardArrow class="hover_card_arrowClass" :width="20" :height="10" />
          <CardContentPlaceholder />
        </OkuHoverCardContent>
      </OkuHoverCardPortal>
    </OkuHoverCard>
  </div>
</template>
