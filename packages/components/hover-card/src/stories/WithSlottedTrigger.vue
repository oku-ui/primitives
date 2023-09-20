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
      <button class="hover-card-trigger" @click="() => console.log('StyledTrigger click')">
        trigger
      </button>
    </OkuHoverCardTrigger>
    <OkuHoverCardPortal>
      <OkuHoverCardContent class="content" :side-offset="5">
        <OkuHoverCardArrow class="hover-card-arrow" :width="20" :height="10" :offset="10" />
        <CardContentPlaceholder />
      </OkuHoverCardContent>
    </OkuHoverCardPortal>
  </OkuHoverCard>
</template>
