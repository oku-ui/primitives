<script setup lang="ts">
import { OkuMenuGroup, OkuMenuItem, OkuMenuLabel, OkuMenuSeparator } from '@oku-ui/menu'
import { foodGroups } from './foods'
import MenuWithAnchor from './MenuWithAnchor.vue'

function alert(text: string) {
  // eslint-disable-next-line no-alert
  window.alert(text)
}
</script>

<template>
  <MenuWithAnchor>
    <OkuMenuGroup v-for="(foodGroup, index) in foodGroups" :key="index">
      <OkuMenuLabel v-if="foodGroup.label" :key="foodGroup.label" class="menu-label">
        {{ foodGroup.label }}
      </OkuMenuLabel>

      <OkuMenuItem
        v-for="food in foodGroup.foods"
        :key="food.value"
        class="menu-item"
        :disabled="food.disabled"
        @select="alert(food.label)"
      >
        {{ food.label }}
      </OkuMenuItem>
      <OkuMenuSeparator v-if="index < foodGroups.length - 1" class="menu-separator" />
    </OkuMenuGroup>
  </MenuWithAnchor>
</template>
