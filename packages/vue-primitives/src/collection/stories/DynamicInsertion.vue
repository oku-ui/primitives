<script setup lang="ts">
import { shallowRef } from 'vue'
import { DATA_COLLECTION_ITEM } from '../index.ts'
import Item from './item.vue'
import List from './List.vue'
import LogItems from './LogItems.vue'
import Tomato from './Tomato.vue'

const hasTomato = shallowRef(false)

function setHasTomato(value: boolean) {
  hasTomato.value = value
}

function log() {
  console.warn('Items:', Array.from(document.querySelectorAll(`[${DATA_COLLECTION_ITEM}]`)))
}
</script>

<template>
  <div>
    <button @click="() => setHasTomato(!hasTomato)">
      {{ hasTomato ? 'Remove' : 'Add' }}
      {{ ' ' }}
      Tomato
    </button>
    <button :style="{ marginLeft: '10px' }" @click="() => log()">
      Force Update
    </button>
  </div>

  <List>
    <Item>Red</Item>
    <Tomato v-if="hasTomato" />
    <Item disabled>
      Green
    </Item>
    <Item>Blue</Item>
    <LogItems />
  </List>
</template>
