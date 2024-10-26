<script setup lang="ts">
import { HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from '../index.ts'
import CardContentPlaceholder from './CardContentPlaceholder.vue'
import './styles.css'
</script>

<template>
  <div>
    <h1>Delay duration</h1>
    <h2>Default (700ms open, 300ms close)</h2>

    <HoverCardRoot>
      <HoverCardTrigger href="/" class="hoverCard_triggerClass">
        trigger
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent class="hoverCard_contentClass">
          <CardContentPlaceholder />
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>

    <h2>Custom (instant, 0ms open, 0ms close)</h2>
    <HoverCardRoot :open-delay="0" :close-delay="0">
      <HoverCardTrigger href="/" class="hoverCard_triggerClass">
        trigger
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent class="hoverCard_contentClass">
          <CardContentPlaceholder />
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>

    <h2>Custom (300ms open, 100ms close)</h2>

    <HoverCardRoot :open-delay="300" :close-delay="100">
      <HoverCardTrigger href="/" class="hoverCard_triggerClass">
        trigger
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent class="hoverCard_contentClass">
          <CardContentPlaceholder />
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>
  </div>
</template>
