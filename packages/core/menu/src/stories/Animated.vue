<script setup lang="ts">
import { reactive, ref } from 'vue'
import { OkuMenuCheckboxItem, OkuMenuItemIndicator, OkuMenuRadioGroup, OkuMenuRadioItem } from '@oku-ui/menu'
import MenuWithAnchor from './MenuWithAnchor.vue'
import TickIcon from './TickIcon.vue'

const files = ['README.md', 'index.js', 'page.css']
const file = ref(files[1])
const open = ref(true)
const checkboxItems = reactive([
  { label: 'Bold', state: false },
  { label: 'Italic', state: true },
  { label: 'Underline', state: false },
  { label: 'Strikethrough', state: false, disabled: true },
])
</script>

<template>
  <label>
    <input type="checkbox" :checked="open" @change="(event) => open = (event.target as HTMLInputElement).checked">{{ ' ' }}
    open
  </label>
  <br>
  <br>
  <MenuWithAnchor class="menu-animated-content menu-content" :open="open">
    <OkuMenuCheckboxItem
      v-for="({ label, state, disabled }, index) in checkboxItems"
      :key="label"
      class="menu-item"
      :checked="state"
      :disabled="disabled"
      @checked-change="checkboxItems[index].state = !state"
    >
      {{ label }}
      <OkuMenuItemIndicator class="menu-animated-item-indicator">
        <TickIcon />
      </OkuMenuItemIndicator>
    </OkuMenuCheckboxItem>
    <OkuMenuRadioGroup :value="file" @value-change="(value: string) => file = value">
      <OkuMenuRadioItem v-for="_file in files" :key="_file" class="menu-item" :value="_file">
        {{ _file }}
        <OkuMenuItemIndicator class="menu-animated-item-indicator">
          <TickIcon />
        </OkuMenuItemIndicator>
      </OkuMenuRadioItem>
    </OkuMenuRadioGroup>
  </MenuWithAnchor>
</template>
