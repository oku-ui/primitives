<script setup lang="ts">
import {
  OkuPopover,
  OkuPopoverArrow,
  OkuPopoverClose,
  OkuPopoverContent,
  OkuPopoverPortal,
  OkuPopoverTrigger,
} from '@oku-ui/popover'
</script>

<template>
  <div
    :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '200vh',
    }"
  >
    <OkuPopover>
      <OkuPopoverTrigger class="popover-trigger">
        open
      </OkuPopoverTrigger>
      <OkuPopoverPortal>
        <OkuPopoverContent class="popover-animatedContent" :side-offset="10">
          <OkuPopoverClose class="popover-close">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>
  </div>
</template>
