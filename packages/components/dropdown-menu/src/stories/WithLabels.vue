<script setup lang="ts">
import { OkuDropdownMenu, OkuDropdownMenuArrow, OkuDropdownMenuContent, OkuDropdownMenuGroup, OkuDropdownMenuItem, OkuDropdownMenuLabel, OkuDropdownMenuPortal, OkuDropdownMenuSeparator, OkuDropdownMenuTrigger } from '@oku-ui/dropdown-menu'
import { foodGroups } from './foods'
</script>

<template>
  <div :style="{ textAlign: 'center', padding: '50px' }">
    <OkuDropdownMenu>
      <OkuDropdownMenuTrigger class="dropdown-menu-trigger">
        Open
      </OkuDropdownMenuTrigger>
      <OkuDropdownMenuPortal>
        <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5">
          <OkuDropdownMenuGroup v-for="(foodGroup, index) in foodGroups" :key="index">
            <OkuDropdownMenuLabel v-if="foodGroup.label" :key="foodGroup.label" class="dropdown-menu-label">
              {{ foodGroup.label }}
            </OkuDropdownMenuLabel>
            <OkuDropdownMenuItem
              v-for="food in foodGroup.foods"
              :key="food.value"
              class="dropdown-menu-item"
              :disabled="food.disabled"
              @select="console.log(food.label)"
            >
              {{ food.label }}
            </OkuDropdownMenuItem>
            <OkuDropdownMenuSeparator v-if="index < foodGroups.length - 1" class="dropdown-menu-separator" />
          </OkuDropdownMenuGroup>
          <OkuDropdownMenuArrow />
        </OkuDropdownMenuContent>
      </OkuDropdownMenuPortal>
    </OkuDropdownMenu>
  </div>
</template>
