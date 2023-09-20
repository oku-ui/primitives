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
  <div style="padding: 50px; display: flex; justify-content: center">
    <OkuHoverCard>
      <OkuHoverCardTrigger href="/" class="hover_card_triggerClass">
        trigger
      </OkuHoverCardTrigger>
      <OkuHoverCardPortal>
        <OkuHoverCardContent class="hover_card_animatedContentClass" :side-offset="10">
          <OkuHoverCardArrow class="hover_card_arrowClass" :width="20" :height="10" />
          <CardContentPlaceholder />
        </OkuHoverCardContent>
      </OkuHoverCardPortal>
    </OkuHoverCard>
  </div>
</template>
