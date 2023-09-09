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
  <div style="padding: 50px; display: flex; justify-content: center">
    <OkuHoverCard :open="open" @on-open-change="open = !open">
      <OkuHoverCardTrigger href="/" class="triggerClass">
        trigger
      </OkuHoverCardTrigger>
      <OkuHoverCardPortal>
        <OkuHoverCardContent class="contentClass">
          <OkuHoverCardArrow class="arrowClass" width="20px" height="10px" />
          <CardContentPlaceholder />
        </OkuHoverCardContent>
      </OkuHoverCardPortal>
    </OkuHoverCard>
  </div>
</template>
