<script setup lang="ts">
import { HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from '../index.ts'
import CardContentPlaceholder from './CardContentPlaceholder.vue'
import './styles.css'
</script>

<template>
  <div :style="{ padding: '50px', display: 'flex', justifyContent: 'center' }">
    <HoverCardRoot>
      <HoverCardTrigger href="/" class="hoverCard_triggerClass">
        trigger
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent class="hoverCard_animatedContentClass" :side-offset="10">
          <HoverCardArrow class="hoverCard_arrowClass" :width="20" :height="10" />
          <CardContentPlaceholder />
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>
  </div>
</template>
