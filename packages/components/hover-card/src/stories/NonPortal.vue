<script setup lang="ts">
import {
  OkuHoverCard,
  OkuHoverCardArrow,
  OkuHoverCardContent,
  OkuHoverCardTrigger,
} from '@oku-ui/hover-card'
import CardContentPlaceholder from './CardContentPlaceholder.vue'
</script>

<template>
  <div>
    <button>button</button>
    <OkuHoverCard>
      <OkuHoverCardTrigger href="/" class="hover-card-triggerClass">
        trigger
      </OkuHoverCardTrigger>
      <OkuHoverCardContent class="contentClass" :side-offset="5">
        <OkuHoverCardArrow class="hover-card-arrowClass" :width="20" :height="10" :offset="10" />
        <a href="#link">Should not be able to focus me</a>
        <CardContentPlaceholder />
      </OkuHoverCardContent>
    </OkuHoverCard>
    <button>button</button>
  </div>
</template>
