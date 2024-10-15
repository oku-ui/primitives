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
      <OkuHoverCardTrigger href="/" class="hover-card-trigger">
        triggers
      </OkuHoverCardTrigger>
      <OkuHoverCardPortal force-mount>
        <OkuHoverCardContent class="content" :side-offset="10">
          <OkuHoverCardArrow class="hover-card-arrow" :width="20" :height="10" />
          <CardContentPlaceholder />
        </OkuHoverCardContent>
      </OkuHoverCardPortal>
    </OkuHoverCard>
  </div>
</template>
