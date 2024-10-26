<script setup lang="ts">
import { shallowRef } from 'vue'
import { MenuCheckboxItem, MenuItemIndicator, MenuSeparator } from '../index.ts'
import MenuWithAnchor from './MenuWithAnchor.vue'
import TickIcon from './TickIcon.vue'

const options = ['Crows', 'Ravens', 'Magpies', 'Jackdaws']

const selection = shallowRef<string[]>([])

function handleSelectAll() {
  const cur = selection.value
  selection.value = cur.length === options.length ? [] : options
}

function onChange(option: string) {
  const cur = selection.value
  selection.value = cur.includes(option)
    ? cur.filter(el => el !== option)
    : cur.concat(option)
}
</script>

<template>
  <div>
    <MenuWithAnchor>
      <MenuCheckboxItem
        class="menu_itemClass"
        :checked="selection.length === options.length ? true : selection.length ? 'indeterminate' : false"
        @update:checked="handleSelectAll"
      >
        Select all
        <MenuItemIndicator>
          <TickIcon v-if="selection.length === options.length" />
          <template v-else>
            —
          </template>
        </MenuItemIndicator>
      </MenuCheckboxItem>
      <MenuSeparator class="menu_separatorClass" />
      <MenuCheckboxItem
        v-for="option in options"
        :key="option"
        class="menu_itemClass"
        :checked="selection.includes(option)"
        @update:checked="onChange(option)"
      >
        {{ option }}
        <MenuItemIndicator>
          <TickIcon />
        </MenuItemIndicator>
      </MenuCheckboxItem>
    </MenuWithAnchor>
  </div>
</template>
