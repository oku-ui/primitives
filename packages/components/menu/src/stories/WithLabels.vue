<script setup lang="ts">
import { OkuMenuGroup, OkuMenuItem, OkuMenuLabel, OkuMenuSeparator } from '@oku-ui/menu'
import MenuWithAnchor from './MenuWithAnchor.vue'
import { foodGroups } from './foods'

function alert(text: string) {
  // eslint-disable-next-line no-alert
  window.alert(text)
}
</script>

<template>
  <MenuWithAnchor>
    <OkuMenuGroup v-for="(foodGroup, index) in foodGroups" :key="index">
      <OkuMenuLabel v-if="foodGroup.label" :key="foodGroup.label" class="label">
        {{ foodGroup.label }}
      </OkuMenuLabel>

      <OkuMenuItem
        v-for="(food) in foodGroups.foods"
        :key="food.value"
        class="item"
        :disabled="food.disabled"
        @select="alert(food.label)"
      >
        {{ food.label }}
      </OkuMenuItem>
      <OkuMenuSeparator v-if="index < foodGroups.length - 1" class="separator" />
    </OkuMenuGroup>
  </MenuWithAnchor>
</template>
