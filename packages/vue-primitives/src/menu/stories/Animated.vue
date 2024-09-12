<script setup lang="ts">
import { shallowRef } from 'vue'
import { MenuCheckboxItem, MenuItemIndicator, MenuRadioGroup, MenuRadioItem } from '../index.ts'
import MenuWithAnchor from './MenuWithAnchor.vue'
import TickIcon from './TickIcon.vue'
import './styles.css'

const files = ['README.md', 'index.js', 'page.css']
const file = shallowRef(files[1])

function setFile(v: string) {
  file.value = v
}

const open = shallowRef(true)
const checkboxItems = [
  {
    label: 'Bold',
    state: shallowRef(false),
  },
  {
    label: 'Italic',
    state: shallowRef(true),
  },
  {
    label: 'Underline',
    state: shallowRef(false),
  },
  {
    label: 'Strikethrough',
    state: shallowRef(false),
    disabled: true,
  },
]

function onChange(event: any) {
  open.value = event.target.checked
}
</script>

<template>
  <div>
    <label>
      <input type="checkbox" :checked="open" @change="onChange">{{ ' ' }}
      open
    </label>
    <br>
    <br>
    <MenuWithAnchor class="menu_animatedContentClass" :open="open">
      <MenuCheckboxItem
        v-for="checkboxItem in checkboxItems"
        :key="checkboxItem.label"
        class="menu_itemClass"
        :checked="checkboxItem.state.value"
        :disabled="checkboxItem.disabled"
        @update:checked="(v) => {
          checkboxItem.state.value = v
        }"
      >
        {{ checkboxItem.label }}
        <MenuItemIndicator class="menu_animatedItemIndicatorClass">
          <TickIcon />
        </MenuItemIndicator>
      </MenuCheckboxItem>
      <MenuRadioGroup :value="file" @update:value="setFile">
        <MenuRadioItem
          v-for="el in files"
          :key="el"
          class="menu_itemClass"
          :value="el"
        >
          {{ el }}
          <MenuItemIndicator class="menu_animatedItemIndicatorClass">
            <TickIcon />
          </MenuItemIndicator>
        </MenuRadioItem>
      </MenuRadioGroup>
    </MenuWithAnchor>
  </div>
</template>
