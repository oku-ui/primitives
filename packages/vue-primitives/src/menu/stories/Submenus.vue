<script setup lang="ts">
import type { Direction } from '../../direction/index.ts'
import { shallowRef } from 'vue'
import { provideConfigContext } from '../../config/index.ts'
import { MenuItem, MenuSeparator } from '../index.ts'
import MenuWithAnchor from './MenuWithAnchor.vue'
import Submenu from './Submenu.vue'

const open1 = shallowRef(false)
const open2 = shallowRef(false)
const open3 = shallowRef(false)
const open4 = shallowRef(false)
const dir = shallowRef<Direction>('ltr')
const rtl = shallowRef(false)
const animated = shallowRef(false)

function setRtl(value: boolean) {
  dir.value = value ? 'rtl' : 'ltr'
  rtl.value = value
}

function setAnimated(value: boolean) {
  animated.value = value
}

function alert(name: string) {
  // eslint-disable-next-line no-alert
  window.alert(name)
}

provideConfigContext({
  dir,
})
</script>

<template>
  <div>
    <div :style="{ marginBottom: '8px', display: 'grid', gridAutoFlow: 'row', gap: '4px' }">
      <label>
        <input
          type="checkbox"
          :checked="rtl"
          @input="(event) => setRtl((event.currentTarget as any).checked)"
        >
        Right-to-left {{ dir }}
      </label>
      <label>
        <input
          type="checkbox"
          :checked="animated"
          @input="(event) => setAnimated((event.currentTarget as any).checked)"
        >
        Animated
      </label>
    </div>
    <MenuWithAnchor>
      <MenuItem class="menu_itemClass" @select="() => alert('undo')">
        Undo
      </MenuItem>
      <Submenu v-model:open="open1" :animated="animated">
        <MenuItem class="menu_itemClass" disabled>
          Disabled
        </MenuItem>
        <MenuItem class="menu_itemClass" @select="() => alert('one')">
          One
        </MenuItem>
        <Submenu v-model:open="open2" :animated="animated">
          <MenuItem class="menu_itemClass" @select="() => alert('one')">
            One
          </MenuItem>
          <MenuItem class="menu_itemClass" @select="() => alert('two')">
            Two
          </MenuItem>
          <MenuItem class="menu_itemClass" @select="() => alert('three')">
            Three
          </MenuItem>
          <MenuItem class="menu_itemClass" @select="() => alert('four')">
            Four
          </MenuItem>
          <MenuItem class="menu_itemClass" @select="() => alert('five')">
            Five
          </MenuItem>
          <MenuItem class="menu_itemClass" @select="() => alert('six')">
            Six
          </MenuItem>
        </Submenu>
        <Submenu v-model:open="open3" heading="Sub Menu" :animated="animated">
          <MenuItem class="menu_itemClass" @select="() => alert('one')">
            One
          </MenuItem>
          <MenuItem class="menu_itemClass" @select="() => alert('two')">
            Two
          </MenuItem>
          <MenuItem class="menu_itemClass" @select="() => alert('three')">
            Three
          </MenuItem>
        </Submenu>
        <MenuItem class="menu_itemClass" @select="() => alert('two')">
          Two
        </MenuItem>
        <Submenu v-model:open="open4" :animated="animated" disabled>
          <MenuItem class="menu_itemClass" @select="() => alert('one')">
            One
          </MenuItem>
          <MenuItem class="menu_itemClass" @select="() => alert('two')">
            Two
          </MenuItem>
          <MenuItem class="menu_itemClass" @select="() => alert('three')">
            Three
          </MenuItem>
        </Submenu>
        <MenuItem class="menu_itemClass" @select="() => alert('three')">
          Three
        </MenuItem>
      </Submenu>

      <MenuSeparator class="menu_separatorClass" />
      <MenuItem class="menu_itemClass" disabled @select="() => alert('cut')">
        Cut
      </MenuItem>
      <MenuItem class="menu_itemClass" @select="() => alert('copy')">
        Copy
      </MenuItem>
      <MenuItem class="menu_itemClass" @select="() => alert('paste')">
        Paste
      </MenuItem>
    </MenuWithAnchor>
  </div>
</template>
