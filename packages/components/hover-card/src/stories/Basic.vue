<script setup lang="ts">
import {
  OkuHoverCard,
  OkuHoverCardArrow,
  OkuHoverCardContent,
  OkuHoverCardPortal,
  OkuHoverCardTrigger,
} from '@oku-ui/hover-card'
import CardContentPlaceholder from './CardContentPlaceholder.vue'
</script>

<template>
  <div class="p-28 flex flex-center justify-center">
    <OkuHoverCard>
      <OkuHoverCardTrigger href="/" class="hover_card_triggerClass">
        trigger
      </OkuHoverCardTrigger>
      <OkuHoverCardPortal>
        <OkuHoverCardContent class="contentClass" :side-offset="5">
          <OkuHoverCardArrow class="hover_card_arrowClass" :width="20" :height="10" />
          <CardContentPlaceholder />
        </OkuHoverCardContent>
      </OkuHoverCardPortal>
    </OkuHoverCard>
  </div>
</template>
