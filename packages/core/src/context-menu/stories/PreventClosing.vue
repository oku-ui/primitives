<script setup lang="ts">
import { ContextMenuContent, ContextMenuItem, ContextMenuPortal, ContextMenuRoot, ContextMenuTrigger } from '../index.ts'
import '../../menu/stories/styles.css'
import './styles.css'

function log(v: string) {
  // eslint-disable-next-line no-alert
  alert(v)
}
</script>

<template>
  <div :style="{ textAlign: 'center', padding: '50px' }">
    <ContextMenuRoot>
      <ContextMenuTrigger class="contextMenu_triggerClass">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuContent class="menu_contentClass" :align-offset="-5">
          <ContextMenuItem class="menu_itemClass" @select="log('action 1')">
            I will close
          </ContextMenuItem>
          <ContextMenuItem
            class="menu_itemClass"
            @select="(event) => {
              event.preventDefault();
              log('action 1');
            }"
          >
            I won't close
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuPortal>
    </ContextMenuRoot>
  </div>
</template>
