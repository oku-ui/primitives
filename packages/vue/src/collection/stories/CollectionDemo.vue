<script setup lang="ts">
import { ref } from 'vue'
import Countries from './Countries.vue'
import Item from './Item.vue'
import List from './List.vue'
import { LogItems } from './LogItems'
import Tomato from './Tomato.vue'

export interface OkuCollectionProps {
  template: '#1' | '#2' | '#3' | '#4' | '#5' | '#6' | '#7'
  allshow?: boolean
}

withDefaults(defineProps<OkuCollectionProps>(), {
  template: '#1',
})

const isDisabled = ref(false)
const hasTomato = ref(false)

function handleTomato() {
  hasTomato.value = !hasTomato.value
}

function handleDisable() {
  isDisabled.value = !isDisabled.value
}
</script>

<template>
  <div class="cursor-default inline-block">
    <div v-if="template === '#1' || allshow" class="flex flex-col">
      <List>
        <Item>Red</Item>
        <Item disabled>
          Green
        </Item>
        <Item>Blue</Item>
        <LogItems />
      </List>
    </div>
    <div v-if="template === '#2' || allshow" class="flex flex-col">
      <List>
        <div style="font-variant: small-caps;">
          Colors
        </div>
        <Item>Red</Item>
        <Item disabled>
          Green
        </Item>
        <Item>Blue</Item>
        <div style="font-variant: small-caps;">
          Words
        </div>
        <Item>Hello</Item>
        <Item>World</Item>
        <LogItems />
      </List>
    </div>
    <div v-if="template === '#3' || allshow" class="flex flex-col">
      <List>
        <Item>Red</Item>
        <Item disabled>
          Green
        </Item>
        <Item>Blue</Item>
        <Tomato />
        <LogItems />
      </List>
    </div>
    <div v-if="template === '#4' || allshow" class="flex flex-col">
      <List>
        <Countries />
        <LogItems />
      </List>
    </div>
    <div v-if="template === '#5' || allshow" class="flex flex-col">
      <button @click="handleTomato">
        {{ hasTomato ? 'Remove' : 'Add' }} Tomato
      </button>
      <button @click="LogItems({})">
        Force Update
      </button>
      <List>
        <Item>Red</Item>
        <Tomato v-if="hasTomato" />
        <Item disabled>
          Green
        </Item>
        <Item>Blue</Item>
        <LogItems />
      </List>
    </div>
    <div v-if="template === '#6' || allshow" class="flex flex-col">
      <button @click="handleDisable">
        {{ isDisabled ? 'Enable' : 'Disable' }} Green
      </button>
      <List>
        <Item>Red</Item>
        <Item :disabled="isDisabled">
          Green
        </Item>
        <Item>Blue</Item>
        <LogItems />
      </List>
    </div>
    <div v-if="template === '#7' || allshow" class="flex flex-col">
      <List>
        <Item>1</Item>
        <Item>
          2
          <List>
            <Item>2.1</Item>
            <Item>2.2</Item>
            <Item>2.3</Item>
            <LogItems name="items inside 2" />
          </List>
        </Item>
        <Item>3</Item>
        <LogItems name="top-level items" />
      </List>
    </div>
  </div>
</template>
