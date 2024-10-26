<script setup lang="ts">
import { foodGroups } from '../../menu/stories/foods.ts'
import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '../index.ts'
import '../../menu/stories/styles.css'
import './styles.css'

function log(v: string) {
  // eslint-disable-next-line no-console
  console.log(v)
}
</script>

<template>
  <div>
    <div :style="{ textAlign: 'center', padding: '50px' }">
      <ContextMenuRoot>
        <ContextMenuTrigger class="contextMenu_triggerClass">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuPortal>
          <ContextMenuContent class="menu_contentClass" :align-offset="-5">
            <ContextMenuGroup v-for="(foodGroup, index) in foodGroups" :key="index">
              <ContextMenuLabel v-if="foodGroup.label" :key="foodGroup.label" class="menu_labelClass">
                {{ foodGroup.label }}
              </ContextMenuLabel>
              <ContextMenuItem
                v-for="food in foodGroup.foods"
                :key="food.value"
                class="menu_itemClass"
                :disabled="food.disabled"
                @select="log(food.label)"
              >
                {{ food.label }}
              </ContextMenuItem>
              <ContextMenuSeparator v-if="index < foodGroups.length - 1" class="menu_separatorClass" />
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenuPortal>
      </ContextMenuRoot>
    </div>
  </div>
</template>
