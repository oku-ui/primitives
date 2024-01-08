<script setup lang="ts">
import {
  OkuPopover,
  OkuPopoverAnchor,
  OkuPopoverClose,
  OkuPopoverContent,
  OkuPopoverPortal,
  OkuPopoverTrigger,
} from '@oku-ui/popover'
</script>

<template>
  <OkuPopover>
    <OkuPopoverAnchor
      :style="{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '250px',
        padding: '20px',
        margin: '100px',
        backgroundColor: '#eee',
      }"
    >
      Item <OkuPopoverTrigger class="popover-trigger">
        open
      </OkuPopoverTrigger>
    </OkuPopoverAnchor>
    <OkuPopoverPortal>
      <OkuPopoverContent
        class="popover-content"
        side="right"
        :side-offset="1"
        align="start"
        :style="{ borderRadius: '0px', width: '200px', height: '100px' }"
      >
        <OkuPopoverClose class="popover-close">
          close
        </OkuPopoverClose>
      </OkuPopoverContent>
    </OkuPopoverPortal>
  </OkuPopover>
</template>
