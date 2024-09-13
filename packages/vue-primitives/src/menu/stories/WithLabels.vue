<script setup lang="ts">
import { MenuGroup, MenuItem, MenuLabel, MenuSeparator } from '../index.ts'
import { foodGroups } from './foods.ts'
import MenuWithAnchor from './MenuWithAnchor.vue'

function alert(name: string) {
  // eslint-disable-next-line no-alert
  window.alert(name)
}
</script>

<template>
  <div>
    <MenuWithAnchor>
      <MenuGroup v-for="(foodGroup, index) in foodGroups" :key="index">
        <MenuLabel v-if="foodGroup.label" :key="foodGroup.label" class="menu_labelClass">
          {{ foodGroup.label }}
        </MenuLabel>
        <MenuItem
          v-for="food in foodGroup.foods"
          :key="food.value"
          class="menu_itemClass"
          :disabled="food.disabled"
          @select="alert(food.label)"
        >
          {{ food.label }}
        </MenuItem>
        <MenuSeparator v-if="index < foodGroups.length - 1" class="menu_separatorClass" />
      </MenuGroup>
    </MenuWithAnchor>
  </div>
</template>
