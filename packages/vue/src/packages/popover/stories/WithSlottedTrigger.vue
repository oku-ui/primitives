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
  <OkuPopover>
    <OkuPopoverTrigger as-child>
      <button class="popover-trigger" @click="() => console.log('StyledTrigger click')">
        open
      </button>
    </OkuPopoverTrigger>
    <OkuPopoverPortal>
      <OkuPopoverContent class="popover-content" :side-offset="5">
        <OkuPopoverClose class="popover-close">
          close
        </OkuPopoverClose>
        <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" :offset="10" />
      </OkuPopoverContent>
    </OkuPopoverPortal>
  </OkuPopover>
</template>
