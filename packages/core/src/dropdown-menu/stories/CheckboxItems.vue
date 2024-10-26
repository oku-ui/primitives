<script setup lang="ts">
import { shallowRef } from 'vue'
import TickIcon from '../../menu/stories/TickIcon.vue'
import { DropdownMenuArrow, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItemIndicator, DropdownMenuPortal, DropdownMenuRoot, DropdownMenuSeparator, DropdownMenuTrigger } from '../index.ts'
import './style.css'
import '../../menu/stories/styles.css'

const options = ['Crows', 'Ravens', 'Magpies', 'Jackdaws']

const selection = shallowRef<string[]>([])

function setSelection(fn: (current: string[]) => string[]) {
  selection.value = fn(selection.value)
}

function handleSelectAll() {
  setSelection(currentSelection => (currentSelection.length === options.length ? [] : options))
}

function preventDefault(e: Event) {
  e.preventDefault()
}
</script>

<template>
  <div>
    <div :style="{ textAlign: 'center', padding: '50px' }">
      <DropdownMenuRoot>
        <DropdownMenuTrigger class="dropdownMenu_triggerClass">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent class="menu_contentClass" :side-offset="5">
            <DropdownMenuGroup>
              <DropdownMenuCheckboxItem
                class="menu_itemClass"
                :checked="
                  selection.length === options.length
                    ? true
                    : selection.length
                      ? 'indeterminate'
                      : false
                "
                @select="preventDefault"
                @update:checked="handleSelectAll"
              >
                Select all
                <DropdownMenuItemIndicator>
                  <TickIcon v-if="selection.length === options.length" />
                  <template v-else>
                    —
                  </template>
                </DropdownMenuItemIndicator>
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator class="menu_separatorClass" />
              <DropdownMenuCheckboxItem
                v-for="option in options"
                :key="option"
                class="menu_itemClass"
                :checked="selection.includes(option)"
                @select="preventDefault"
                @update:checked="() =>
                  setSelection((current) =>
                    current.includes(option)
                      ? current.filter((el) => el !== option)
                      : current.concat(option),
                  )
                "
              >
                {{ option }}
                <DropdownMenuItemIndicator>
                  <TickIcon />
                </DropdownMenuItemIndicator>
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
            <DropdownMenuArrow />
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>
    </div>
  </div>
</template>
