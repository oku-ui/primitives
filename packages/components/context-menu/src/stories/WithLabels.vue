<script setup lang="ts">
import { OkuContextMenu, OkuContextMenuContent, OkuContextMenuGroup, OkuContextMenuItem, OkuContextMenuLabel, OkuContextMenuPortal, OkuContextMenuSeparator, OkuContextMenuSub, OkuContextMenuSubContent, OkuContextMenuSubTrigger, OkuContextMenuTrigger } from '@oku-ui/context-menu'
import { foodGroups } from './foods'
</script>

<template>
  <div :style="{ textAlign: 'center', padding: '50px' }">
    <OkuContextMenu>
      <OkuContextMenuTrigger class="context-menu-trigger">
        Right click here
      </OkuContextMenuTrigger>
      <OkuContextMenuPortal>
        <OkuContextMenuContent class="context-menu-content" :align-offset="-5">
          <OkuContextMenuGroup v-for="(foodGroup, index) in foodGroups" :key="index">
            <OkuContextMenuLabel v-if="foodGroup.label" :key="foodGroup.label" class="context-menu-label">
              {{ foodGroup.label }}
            </OkuContextMenuLabel>
            <OkuContextMenuItem
              v-for="food in foodGroup.foods"
              :key="food.value"
              class="context-menu-item"
              :disabled="food.disabled"
              @select="console.log(food.label)"
            >
              {{ food.label }}
            </OkuContextMenuItem>
            <OkuContextMenuSeparator v-if="index < foodGroups.length - 1" class="context-menu-separator" />
          </OkuContextMenuGroup>
        </OkuContextMenuContent>
      </OkuContextMenuPortal>
    </OkuContextMenu>
  </div>
</template>
