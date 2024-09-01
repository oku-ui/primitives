<script setup lang="ts">
import './styles.css'
import { HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from '../index.ts'
import CardContentPlaceholder from './CardContentPlaceholder.vue'
</script>

<template>
  <div :style="{ padding: '50px', display: 'flex', justifyContent: 'center' }">
    <HoverCardRoot>
      <HoverCardTrigger href="/" class="hoverCard_triggerClass">
        trigger
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent :side-offset="5" as-child>
          <div class="hoverCard_contentClass">
            <HoverCardArrow class="hoverCard_arrowClass" :width="20" :height="10" />
            <CardContentPlaceholder />
          </div>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>
  </div>
</template>
