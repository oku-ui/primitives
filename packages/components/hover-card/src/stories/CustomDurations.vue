<script setup lang="ts">
import {
  OkuHoverCard,
  OkuHoverCardContent,
  OkuHoverCardPortal,
  OkuHoverCardTrigger,
} from '@oku-ui/hover-card'
import CardContentPlaceholder from './CardContentPlaceholder.vue'
</script>

<template>
  <div>
    <h1 class="font-bold text-2xl">
      Delay duration
    </h1>
    <h2 class="font-bold text-xl my-6">
      Default (700ms open, 300ms close)
    </h2>

    <OkuHoverCard>
      <OkuHoverCardTrigger href="/" class="triggerClass underline">
        trigger
      </OkuHoverCardTrigger>
      <OkuHoverCardPortal>
        <OkuHoverCardContent class="contentClass">
          <CardContentPlaceholder />
        </OkuHoverCardContent>
      </OkuHoverCardPortal>
    </OkuHoverCard>

    <h2 class="font-bold text-xl my-6">
      Custom (instant, 0ms open, 0ms close)
    </h2>
    <OkuHoverCard :open-delay="0" :close-delay="0">
      <OkuHoverCardTrigger href="/" class="triggerClass underline">
        trigger
      </OkuHoverCardTrigger>
      <OkuHoverCardPortal>
        <OkuHoverCardContent class="contentClass">
          <CardContentPlaceholder />
        </OkuHoverCardContent>
      </OkuHoverCardPortal>
    </OkuHoverCard>

    <h2 class="font-bold text-xl my-6">
      Custom (300ms open, 100ms close)
    </h2>

    <OkuHoverCard :open-delay="300" :close-delay="100">
      <OkuHoverCardTrigger href="/" class="triggerClass underline">
        trigger
      </OkuHoverCardTrigger>
      <OkuHoverCardPortal>
        <OkuHoverCardContent class="contentClass">
          <CardContentPlaceholder />
        </OkuHoverCardContent>
      </OkuHoverCardPortal>
    </OkuHoverCard>
  </div>
</template>
