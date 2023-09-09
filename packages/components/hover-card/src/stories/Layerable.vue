<script setup lang="ts">
import {
  OkuHoverCard,
  OkuHoverCardArrow,
  OkuHoverCardContent,
  OkuHoverCardPortal,
  OkuHoverCardTrigger,
} from '@oku-ui/hover-card'

/* import {
  OkuDialog,
  OkuDialogClose,
  OkuDialogContent,
  OkuDialogTitle,
  OkuDialogTrigger,
} from '@oku-ui/dialog' */
import CardContentPlaceholder from './CardContentPlaceholder.vue'
</script>

<template>
  <div style="padding: 50px; display: 'flex'; justify-content: 'center'">
    <OkuDialog>
      <OkuDialogTrigger>Open</OkuDialogTrigger>
      <OkuDialogContent
        style="
          position: 'fixed';
          top: '50%';
          left: '50%';
          transform: 'translate(-50%, -50%)';
          background: 'white';
          border: '1px solid';
          borderRadius: 4;
          padding: 20;
        "
      >
        <OkuDialogTitle>Some dialog title</OkuDialogTitle>
        Some dialog content with a{' '}
        <OkuHoverCard>
          <OkuHoverCardTrigger href="/" class="triggerClass">
            trigger
          </OkuHoverCardTrigger>
          <OkuHoverCardPortal>
            <OkuHoverCardContent class="contentClass" :side-offset="5">
              <OkuHoverCardArrow class="arrowClass" width="20px" height="10px" />
              <CardContentPlaceholder />
            </OkuHoverCardContent>
          </OkuHoverCardPortal>
        </OkuHoverCard><span />
        <OkuDialogClose>Close</OkuDialogClose>
      </OkuDialogContent>
    </OkuDialog>
  </div>
</template>
