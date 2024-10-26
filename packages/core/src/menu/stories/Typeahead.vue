<script setup lang="ts">
import { MenuItem } from '../index.ts'
import { foodGroups } from './foods.ts'
import MenuWithAnchor from './MenuWithAnchor.vue'
import WithLabels from './WithLabels.vue'

const suits = [
  { emoji: '♥️', label: 'Hearts' },
  { emoji: '♠️', label: 'Spades' },
  { emoji: '♦️', label: 'Diamonds' },
  { emoji: '♣️', label: 'Clubs' },
]
</script>

<template>
  <div>
    <h1>Testing ground for typeahead behaviour</h1>

    <div :style="{ display: 'flex', alignItems: 'flex-start', gap: '100px' }">
      <div>
        <h2>Text labels</h2>
        <div :style="{ marginBottom: '20px' }">
          <p>
            For comparison
            <br>
            try the closed select below
          </p>
          <select>
            <template v-for="(foodGroup, index) in foodGroups" :key="index">
              <option v-for="food in foodGroup.foods" :key="food.value" :value="food.value" :disabled="food.disabled">
                {{ food.label }}
              </option>
            </template>
          </select>
        </div>
        <WithLabels />
      </div>

      <div>
        <h2>Complex children</h2>
        <p>(relying on `.textContent` — default)</p>
        <MenuWithAnchor>
          <MenuItem v-for="suit in suits" :key="suit.emoji" class="menu_itemClass">
            {{ suit.label }}
            <span role="img" :aria-label="suit.label">
              {{ suit.emoji }}
            </span>
          </MenuItem>
        </MenuWithAnchor>
      </div>

      <div>
        <h2>Complex children</h2>
        <p>(with explicit `textValue` prop)</p>
        <MenuWithAnchor>
          <MenuItem v-for="suit in suits" :key="suit.emoji" class="menu_itemClass" :text-value="suit.label">
            <span role="img" :aria-label="suit.label">
              {{ suit.emoji }}
            </span>
            {{ suit.label }}
          </MenuItem>
        </MenuWithAnchor>
      </div>
    </div>
  </div>
</template>
