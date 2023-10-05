<script setup lang="ts">
import { ref } from 'vue'
import { OkuMenuCheckboxItem, OkuMenuItemIndicator, OkuMenuSeparator } from 'oku-ui/OkuMenu'
import MenuWithAnchor from './MenuWithAnchor.vue'
import TickIcon from './TickIcon.vue'

const options = ['Crows', 'Ravens', 'Magpies', 'Jackdaws']
const selection = ref<string[]>([])

function handleSelectAll() {
  selection.value = currentSelection => (currentSelection.length === options.length ? [] : options)
}
</script>

<template>
  <MenuWithAnchor>
    <OkuMenuCheckboxItem
      class="item" @checked-change="handleSelectAll" @checked="selection.length === options.length ? true : selection.length ? 'indeterminate' : false"
    >
      Select all
      <OkuMenuItemIndicator>
        <TickIcon v-if="selection.length === options.length" />
        <template v-else>
          {{ '—' }}
        </template>
      </OkuMenuItemIndicator>
    </OkuMenuCheckboxItem>
    <OkuMenuSeparator class="separator" />
    <OkuMenuCheckboxItem
      v-for="option in options" :key="option" class="item" :checked="selection.includes(option)"
      @checked-change="selection = (current) => (current.includes(option) ? current.filter((el) => el !== option) : current.concat(option))"
    >
      {{ option }}
      <OkuMenuItemIndicator>
        <TickIcon />
      </OkuMenuItemIndicator>
    </OkuMenuCheckboxItem>
  </MenuWithAnchor>
</template>
