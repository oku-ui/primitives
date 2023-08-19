<!-- eslint-disable no-console -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import List from './List.vue'
import Item from './Item.vue'
import { LogItems } from './LogItems'

export interface OkuCollectionProps {
  template: '#1' | '#2'
  allshow?: boolean
}

withDefaults(defineProps<OkuCollectionProps>(), {
  template: '#1',
})

const labelRef = ref<any>()
onMounted(() => {
  console.log(labelRef.value, 'ref')
})
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
  </div>
</template>
