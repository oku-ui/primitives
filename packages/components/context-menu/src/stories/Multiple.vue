<script setup lang="ts">
import { ref } from 'vue'
import { OkuContextMenu, OkuContextMenuCheckboxItem, OkuContextMenuContent, OkuContextMenuItemIndicator, OkuContextMenuLabel, OkuContextMenuPortal, OkuContextMenuRadioGroup, OkuContextMenuRadioItem, OkuContextMenuSeparator, OkuContextMenuTrigger } from '@oku-ui/context-menu'
import TickIcon from './TickIcon.vue'

const customColors = ref<{ [index: number]: string }>({})
const fadedIndexes = ref<number[]>([])
</script>

<template>
  <div
    :style="{ display: 'flex', flexWrap: 'wrap', gap: '10px' }"
    @context-menu="(event: any) => event.preventDefault()"
  >
    <OkuContextMenu v-for="i in 100" :key="i">
      <OkuContextMenuPortal>
        <OkuContextMenuContent class="context-menu-animated-content" align-offset="-5">
          <OkuContextMenuLabel class="context-menu-label">
            Color
          </OkuContextMenuLabel>
          <OkuContextMenuRadioGroup
            :value="customColors[i]"
            @value-change="(color: string) => customColors = { ...customColors, [i]: color }"
          >
            <OkuContextMenuRadioItem class="context-menu-item" value="royalblue">
              Blue
              <OkuContextMenuItemIndicator>
                <TickIcon />
              </OkuContextMenuItemIndicator>
            </OkuContextMenuRadioItem>
            <OkuContextMenuRadioItem class="context-menu-item" value="tomato">
              Red
              <OkuContextMenuItemIndicator>
                <TickIcon />
              </OkuContextMenuItemIndicator>
            </OkuContextMenuRadioItem>
          </OkuContextMenuRadioGroup>
          <OkuContextMenuSeparator class="context-menu-separator" />
          <OkuContextMenuCheckboxItem
            class="context-menu-item"
            :checked="fadedIndexes.includes(i)"
            @checked-change="(faded: number) => faded ? (fadedIndexes = [...fadedIndexes, i]) : (fadedIndexes = fadedIndexes.filter(index => index !== i))"
          >
            Fade
            <OkuContextMenuItemIndicator>
              <TickIcon />
            </OkuContextMenuItemIndicator>
          </OkuContextMenuCheckboxItem>
        </OkuContextMenuContent>
      </OkuContextMenuPortal>
      <OkuContextMenuTrigger>
        <div
          :style="{
            flexShrink: '0px',
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
      </OkuContextMenuTrigger>
    </OkuContextMenu>
  </div>
</template>
