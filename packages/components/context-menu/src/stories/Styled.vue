<script setup lang="ts">
import { OkuContextMenu, OkuContextMenuContent, OkuContextMenuItem, OkuContextMenuPortal, OkuContextMenuSeparator, OkuContextMenuTrigger } from '@oku-ui/context-menu'
</script>

<template>
  <div
    :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '200vw',
      height: '200vh',
      gap: '20px',
    }"
  >
    <OkuContextMenu>
      <OkuContextMenuTrigger class="context-menu-trigger">
        Right click here
      </OkuContextMenuTrigger>
      <OkuContextMenuPortal>
        <OkuContextMenuContent class="context-menu-content" :align-offset="-5">
          <OkuContextMenuItem class="context-menu-item" @select="console.log('undo')">
            Undo
          </OkuContextMenuItem>
          <OkuContextMenuItem class="context-menu-item" @select="console.log('redo')">
            Redo
          </OkuContextMenuItem>
          <OkuContextMenuSeparator class="context-menu-separator" />
          <OkuContextMenuItem class="context-menu-item" disabled @select="console.log('cut')">
            Cut
          </OkuContextMenuItem>
          <OkuContextMenuItem class="context-menu-item" @select="console.log('copy')">
            Copy
          </OkuContextMenuItem>
          <OkuContextMenuItem class="context-menu-item" @select="console.log('paste')">
            Paste
          </OkuContextMenuItem>
        </OkuContextMenuContent>
      </OkuContextMenuPortal>
    </OkuContextMenu>
  </div>
</template>
