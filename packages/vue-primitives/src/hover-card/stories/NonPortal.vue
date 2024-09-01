<script setup lang="ts">
import './styles.css'
import { HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from '../index.ts'
import CardContentPlaceholder from './CardContentPlaceholder.vue'
</script>

<template>
  <div>
    <button>button</button>
    <HoverCardRoot>
      <HoverCardTrigger href="/" class="hoverCard_triggerClass">
        trigger
      </HoverCardTrigger>
      <HoverCardContent class="hoverCard_contentClass" :side-offset="5">
        <HoverCardArrow class="hoverCard_arrowClass" :width="20" :height="10" />
        <a href="#link">Should not be able to focus me</a>
        <CardContentPlaceholder />
      </HoverCardContent>
    </HoverCardRoot>
    <button>button</button>
  </div>
</template>
