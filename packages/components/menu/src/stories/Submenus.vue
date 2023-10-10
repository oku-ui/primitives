<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { OkuDirectionProvider } from '@oku-ui/direction'
import { OkuMenuItem, OkuMenuSeparator } from '@oku-ui/menu'
import MenuWithAnchor from './MenuWithAnchor.vue'
import Submenu from './Submenu.vue'

const open1 = ref(false)
const open2 = ref(false)
const open3 = ref(false)
const open4 = ref(false)
const rtl = ref(false)
const animated = ref(false)

watchEffect(() => {
  if (rtl.value) {
    document.documentElement.setAttribute('dir', 'rtl')
    return () => document.documentElement.removeAttribute('dir')
  }
})

function alert(text: string) {
  // eslint-disable-next-line no-alert
  window.alert(text)
}
</script>

<template>
  <OkuDirectionProvider :dir="rtl ? 'rtl' : 'ltr'">
    <div :style="{ marginBottom: '8px', display: 'grid', gridAutoFlow: 'row', gap: '4px' }">
      <label>
        <input type="checkbox" :checked="rtl" @change="(event) => rtl = (event.currentTarget as HTMLInputElement).checked">
        Right-to-left
      </label>
      <label>
        <input type="checkbox" :checked="animated" @change="(event) => animated = (event.currentTarget as HTMLInputElement).checked">
        Animated
      </label>
    </div>
    <MenuWithAnchor>
      <OkuMenuItem class="menu-item" @select="alert('undo')">
        Undo
      </OkuMenuItem>
      <Submenu :open="open1" :animated="animated" @open-change="open1 = !open1">
        <OkuMenuItem class="menu-item" disabled>
          Disabled
        </OkuMenuItem>
        <OkuMenuItem class="menu-item" @select="alert('one')">
          One
        </OkuMenuItem>
        <Submenu :open="open2" :animated="animated" @open-change="open2 = !open2">
          <OkuMenuItem class="menu-item" @select="alert('one')">
            One
          </OkuMenuItem>
          <OkuMenuItem class="menu-item" @select="alert('two')">
            Two
          </OkuMenuItem>
          <OkuMenuItem class="menu-item" @select="alert('three')">
            Three
          </OkuMenuItem>
          <OkuMenuItem class="menu-item" @select="alert('four')">
            Four
          </OkuMenuItem>
          <OkuMenuItem class="menu-item" @select="alert('five')">
            Five
          </OkuMenuItem>
          <OkuMenuItem class="menu-item" @select="alert('six')">
            Six
          </OkuMenuItem>
        </Submenu>
        <Submenu heading="Sub Menu" :open="open3" :animated="animated" @open-change="open3 = !open3">
          <OkuMenuItem class="menu-item" @select="alert('one')">
            One
          </OkuMenuItem>
          <OkuMenuItem class="menu-item" @select="alert('two')">
            Two
          </OkuMenuItem>
          <OkuMenuItem class="menu-item" @select="alert('three')">
            Three
          </OkuMenuItem>
        </Submenu>
        <OkuMenuItem class="menu-item" @select="alert('two')">
          Two
        </OkuMenuItem>
        <Submenu :open="open4" :animated="animated" disabled @open-change="open4 = !open4">
          <OkuMenuItem class="menu-item" @select="alert('one')">
            One
          </OkuMenuItem>
          <OkuMenuItem class="menu-item" @select="alert('two')">
            Two
          </OkuMenuItem>
          <OkuMenuItem class="menu-item" @select="alert('three')">
            Three
          </OkuMenuItem>
        </Submenu>
        <OkuMenuItem class="menu-item" @select="alert('three')">
          Three
        </OkuMenuItem>
      </Submenu>

      <OkuMenuSeparator class="menu-separator" />
      <OkuMenuItem class="menu-item" disabled @select="alert('cut')">
        Cut
      </OkuMenuItem>
      <OkuMenuItem class="menu-item" @select="alert('copy')">
        Copy
      </OkuMenuItem>
      <OkuMenuItem class="menu-item" @select="alert('paste')">
        Paste
      </OkuMenuItem>
    </MenuWithAnchor>
  </OkuDirectionProvider>
</template>
