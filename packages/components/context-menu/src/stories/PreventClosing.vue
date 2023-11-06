<script setup lang="ts">
import { OkuContextMenu, OkuContextMenuContent, OkuContextMenuItem, OkuContextMenuPortal, OkuContextMenuTrigger } from '@oku-ui/context-menu'

function alert(text: string) {
  // eslint-disable-next-line no-alert
  window.alert(text)
}
</script>

<template>
  <div :style="{ textAlign: 'center', padding: '50px' }">
    <OkuContextMenu>
      <OkuContextMenuTrigger class="context-menu-trigger">
        Right click here
      </OkuContextMenuTrigger>
      <OkuContextMenuPortal>
        <OkuContextMenuContent class="context-menu-content" :align-offset="-5">
          <OkuContextMenuItem class="context-menu-item" @select="alert('action 1')">
            I will close
          </OkuContextMenuItem>
          <OkuContextMenuItem
            class="context-menu-item"
            @select="(event: any) => {
              event.preventDefault()
              alert('action 1')
            }"
          >
            I won't close
          </OkuContextMenuItem>
        </OkuContextMenuContent>
      </OkuContextMenuPortal>
    </OkuContextMenu>
  </div>
</template>
