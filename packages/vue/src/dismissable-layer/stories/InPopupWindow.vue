<script setup lang="ts">
import { createApp, onBeforeUnmount } from 'vue'
import DismissableBox from './DismissableBox.vue'

function handlePopupClick() {
  const popupWindow = window.open(
    undefined,
    undefined,
    'width=300,height=300,top=100,left=100',
  )

  if (!popupWindow) {
    console.error(
      'Failed to open popup window, check your popup blocker settings',
    )
    return
  }

  const containerNode = popupWindow.document.createElement('div')
  popupWindow.document.body.append(containerNode)

  const app = createApp(DismissableBox)
  app.mount(containerNode)

  onBeforeUnmount(() => containerNode.remove())
}
</script>

<template>
  <div :style="{ fontFamily: 'sans-serif', textAlign: 'center' }">
    <button @click="handlePopupClick">
      Open Popup
    </button>
  </div>
</template>
