<script setup lang="ts">
import { shallowRef } from 'vue'
import TickIcon from '../../menu/stories/TickIcon.vue'
import {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItemIndicator,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '../index.ts'
import '../../menu/stories/styles.css'
import './styles.css'

const array = Array.from({ length: 100 }, (_, i) => i)

const customColors = shallowRef<{ [index: number]: string }>({})

function setCustomColor(index: number, color: string) {
  customColors.value = { ...customColors.value, [index]: color }
}

const fadedIndexes = shallowRef<number[]>([])

function setFadedIndexes(faded: boolean, i: number) {
  fadedIndexes.value = faded ? [...fadedIndexes.value, i] : fadedIndexes.value.filter(index => index !== i)
}
</script>

<template>
  <div>
    <div
      :style="{
        display: 'flex', flexWrap: 'wrap', gap: '10px',
      }"

      @contextmenu="(event) => event.preventDefault()"
    >
      <ContextMenuRoot v-for="i in array" :key="i">
        <ContextMenuPortal>
          <ContextMenuContent class="menu_contentClass menu_animatedContentClass" :align-offset="-5">
            <ContextMenuLabel class="menu_labelClass">
              Color
            </ContextMenuLabel>
            <ContextMenuRadioGroup
              :value="customColors[i]"
              @update:value="(color) => setCustomColor(i, color)"
            >
              <ContextMenuRadioItem class="menu_itemClass" value="royalblue">
                Blue
                <ContextMenuItemIndicator>
                  <TickIcon />
                </ContextMenuItemIndicator>
              </ContextMenuRadioItem>
              <ContextMenuRadioItem class="menu_itemClass" value="tomato">
                Red
                <ContextMenuItemIndicator>
                  <TickIcon />
                </ContextMenuItemIndicator>
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
            <ContextMenuSeparator class="menu_separatorClass" />
            <ContextMenuCheckboxItem
              class="menu_itemClass"
              :checked="fadedIndexes.includes(i)"
              @update:checked="(checked) => {
                setFadedIndexes(checked, i)
              }"
            >
              Fade
              <ContextMenuItemIndicator>
                <TickIcon />
              </ContextMenuItemIndicator>
            </ContextMenuCheckboxItem>
          </ContextMenuContent>
        </ContextMenuPortal>
        <ContextMenuTrigger>
          <div
            :style="{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px',
              height: '100px',
              backgroundColor: customColors[i] ? customColors[i] : '#eeeef0',
              color: customColors[i] ? 'white' : '#666670',
              fontSize: '32px',
              borderRadius: '5px',
              cursor: 'default',
              userSelect: 'none',
              opacity: fadedIndexes.includes(i) ? 0.5 : 1,
            }"
          >
            {{ i + 1 }}
          </div>
        </ContextMenuTrigger>
      </ContextMenuRoot>
    </div>
  </div>
</template>
