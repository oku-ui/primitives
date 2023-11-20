<script setup lang="ts">
import { createApp, h } from 'vue'
import { OkuDropdownMenu, OkuDropdownMenuContent, OkuDropdownMenuItem, OkuDropdownMenuPortal, OkuDropdownMenuTrigger } from '@oku-ui/dropdown-menu'

function handlePopupClick() {
  const popupWindow = window.open(undefined, undefined, 'width=300,height=300,top=100,left=100')
  if (!popupWindow) {
    console.error('Failed to open popup window, check your popup blocker settings')
    return
  }

  const containerNode = popupWindow.document.createElement('div')
  popupWindow.document.body.append(containerNode)

  const app = createApp({
    render: () => h(OkuDropdownMenu, {}, {
      default: () => [
        h(OkuDropdownMenuTrigger, {}, {
          default: () => 'Open',
        }),
        h(OkuDropdownMenuPortal, { container: containerNode }, {
          default: () => h(OkuDropdownMenuContent, {}, {
            default: () => [
              h(OkuDropdownMenuItem, {
                class: 'dropdown-menu-item',
                // eslint-disable-next-line no-console
                onSelect: () => console.log('undo'),
              }, {
                default: () => 'Undo',
              }),
              h(OkuDropdownMenuItem, {
                class: 'dropdown-menu-item',
                // eslint-disable-next-line no-console
                onSelect: () => console.log('redo'),
              }, {
                default: () => 'Redo',
              }),
            ],
          }),
        }),
      ],
    }),
  })

  app.mount(containerNode)
}
</script>

<template>
  <div
    :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200vh' }"
  >
    <button @click="handlePopupClick">
      Open Popup
    </button>
  </div>
</template>
