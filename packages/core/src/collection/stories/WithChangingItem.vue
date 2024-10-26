<script setup lang="ts">
import { shallowRef } from 'vue'
import Item from './item.vue'
import List from './List.vue'
import LogItems from './LogItems.vue'

const isDisabled = shallowRef(false)

function setIsDisabled(value: boolean) {
  isDisabled.value = value
}
</script>

<template>
  <button @click="() => setIsDisabled(!isDisabled)">
    {{ isDisabled ? 'Enable' : 'Disable' }}
    {{ ' ' }}
    Green
  </button>

  <List>
    <Item>Red</Item>
    <Item :disabled="isDisabled">
      Green
    </Item>
    <Item>Blue</Item>
    <LogItems />
  </List>
</template>
