<script setup lang="ts">
import { ref } from 'vue'
import { OkuDropdownMenu, OkuDropdownMenuArrow, OkuDropdownMenuCheckboxItem, OkuDropdownMenuContent, OkuDropdownMenuGroup, OkuDropdownMenuItemIndicator, OkuDropdownMenuPortal, OkuDropdownMenuSeparator, OkuDropdownMenuTrigger } from '@oku-ui/dropdown-menu'
import TickIcon from './TickIcon.vue'

const options = ['Crows', 'Ravens', 'Magpies', 'Jackdaws']
const selection = ref<string[]>([])

function handleSelectAll() {
  selection.value = selection.value.length === options.length ? [] : options
}
</script>

<template>
  <div :style="{ textAlign: 'center', padding: '50px' }">
    <OkuDropdownMenu>
      <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
        Open
      </OkuDropdownMenuTrigger>
      <OkuDropdownMenuPortal>
        <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5">
          <OkuDropdownMenuGroup>
            <OkuDropdownMenuCheckboxItem
              class="dropdown-menu-item"
              :checked="
                selection.length === options.length
                  ? true
                  : selection.length
                    ? 'indeterminate'
                    : false
              "
              @select="(e) => e.preventDefault()"
              @checked-change="handleSelectAll"
            >
              Select all
              <OkuDropdownMenuItemIndicator>
                <TickIcon v-if="selection.length === options.length" />
                <template v-else>
                  {{ '—' }}
                </template>
              </OkuDropdownMenuItemIndicator>
            </OkuDropdownMenuCheckboxItem>
            <OkuDropdownMenuSeparator class="dropdown-menu-separator" />
            <OkuDropdownMenuCheckboxItem
              v-for="option in options"
              :key="option"
              class="dropdown-menu-item"
              :checked="selection.includes(option)"
              @select="(e) => e.preventDefault()"
              @checked-change="selection = selection.includes(option) ? selection.filter((el) => el !== option) : selection.concat(option)"
            >
              {{ option }}
              <OkuDropdownMenuItemIndicator>
                <TickIcon />
              </OkuDropdownMenuItemIndicator>
            </OkuDropdownMenuCheckboxItem>
          </OkuDropdownMenuGroup>
          <OkuDropdownMenuArrow />
        </OkuDropdownMenuContent>
      </OkuDropdownMenuPortal>
    </OkuDropdownMenu>
  </div>
</template>
