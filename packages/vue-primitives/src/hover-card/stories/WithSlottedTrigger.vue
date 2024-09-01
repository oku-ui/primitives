<script setup lang="ts">
import './styles.css'
import { HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from '../index.ts'
import CardContentPlaceholder from './CardContentPlaceholder.vue'
</script>

<template>
  <div>
    <HoverCardRoot>
      <HoverCardTrigger as-child>
        <button class="hoverCard_triggerClass" @click="() => console.log('StyledTrigger click')">
          trigger
        </button>
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent class="hoverCard_contentClass" :side-offset="5">
          <HoverCardArrow class="hoverCard_arrowClass" :width="20" :height="10" />
          <CardContentPlaceholder />
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>
  </div>
</template>
