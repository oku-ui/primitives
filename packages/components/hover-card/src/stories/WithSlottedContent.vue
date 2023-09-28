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
  <OkuHoverCard>
    <OkuHoverCardTrigger href="/" class="hover-card-trigger">
      trigger
    </OkuHoverCardTrigger>
    <OkuHoverCardPortal>
      <OkuHoverCardContent as-child :side-offset="5">
        <div class="hover-card-content">
          <OkuHoverCardArrow class="hover-card-arrow" :width="20" :height="10" :offset="10" />
          <CardContentPlaceholder />
        </div>
      </OkuHoverCardContent>
    </OkuHoverCardPortal>
  </OkuHoverCard>
</template>
