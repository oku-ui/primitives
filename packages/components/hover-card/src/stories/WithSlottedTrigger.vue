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
    <OkuHoverCardTrigger as-child>
      <button class="triggerClass" @click="() => console.log('StyledTrigger click')">
        trigger
      </button>
    </OkuHoverCardTrigger>
    <OkuHoverCardPortal>
      <OkuHoverCardContent class="contentClass" :side-offset="5">
        <OkuHoverCardArrow class="arrowClass" :width="20" :height="10" :offset="10" />
        <CardContentPlaceholder />
      </OkuHoverCardContent>
    </OkuHoverCardPortal>
  </OkuHoverCard>
</template>
