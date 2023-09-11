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
    <OkuHoverCardTrigger href="/" class="triggerClass">
      trigger
    </OkuHoverCardTrigger>
    <OkuHoverCardPortal>
      <OkuHoverCardContent as-child :side-offset="5">
        <div class="contentClass">
          <OkuHoverCardArrow class="arrowClass" :width="20" :height="10" :offset="10" />
          <CardContentPlaceholder />
        </div>
      </OkuHoverCardContent>
    </OkuHoverCardPortal>
  </OkuHoverCard>
</template>
