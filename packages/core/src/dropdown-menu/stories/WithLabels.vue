<script setup lang="ts">
import { foodGroups } from '../../menu/stories/foods.ts'
import { DropdownMenuArrow, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRoot, DropdownMenuSeparator, DropdownMenuTrigger } from '../index.ts'
import './style.css'
import '../../menu/stories/styles.css'

function log(v: string) {
  // eslint-disable-next-line no-console
  console.log(v)
}
</script>

<template>
  <div>
    <div :style="{ textAlign: 'center', padding: '50px', minHeight: '600px' }">
      <DropdownMenuRoot>
        <DropdownMenuTrigger class="dropdownMenu_triggerClass">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent class="menu_contentClass" :side-offset="5">
            <DropdownMenuGroup v-for="(foodGroup, index) in foodGroups" :key="index">
              <DropdownMenuLabel v-if="foodGroup.label" :key="foodGroup.label" class="menu_labelClass">
                {{ foodGroup.label }}
              </DropdownMenuLabel>
              <DropdownMenuItem
                v-for="food in foodGroup.foods"
                :key="food.value"
                class="menu_itemClass"
                :disabled="food.disabled"
                @select="log(food.label)"
              >
                {{ food.label }}
              </DropdownMenuItem>
              <DropdownMenuSeparator v-if="index < foodGroups.length - 1" class="menu_separatorClass" />
            </DropdownMenuGroup>
            <DropdownMenuArrow />
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>
    </div>
  </div>
</template>
