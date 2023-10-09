<script setup lang="ts">
import { ref } from 'vue'
import { OkuMenuCheckboxItem, OkuMenuItemIndicator, OkuMenuSeparator } from '@oku-ui/menu'
import MenuWithAnchor from './MenuWithAnchor.vue'
import TickIcon from './TickIcon.vue'

const options = ['Crows', 'Ravens', 'Magpies', 'Jackdaws']
const selection = ref<string[]>([])

function handleSelectAll() {
  selection.value = selection.value.length === options.length ? [] : options
}
</script>

<template>
  <MenuWithAnchor>
    <OkuMenuCheckboxItem
      class="menu-item" @checked-change="handleSelectAll" @checked="selection.length === options.length ? true : selection.length ? 'indeterminate' : false"
    >
      Select all
      <OkuMenuItemIndicator>
        <TickIcon v-if="selection.length === options.length" />
        <template v-else>
          {{ '—' }}
        </template>
      </OkuMenuItemIndicator>
    </OkuMenuCheckboxItem>
    <OkuMenuSeparator class="menu-separator" />
    <OkuMenuCheckboxItem
      v-for="option in options" :key="option" class="menu-item" :checked="selection.includes(option)"
      @checked-change="selection = selection.includes(option) ? selection.filter((el) => el !== option) : selection.concat(option)"
    >
      {{ option }}
      <OkuMenuItemIndicator>
        <TickIcon />
      </OkuMenuItemIndicator>
    </OkuMenuCheckboxItem>
  </MenuWithAnchor>
</template>
