<script setup lang="ts">
import List from './List.vue'
import LogItems from './LogItems.vue'
import Item from './item.vue'
</script>

<template>
  <List>
    <div :style="{ fontVariant: 'small-caps' }">
      Colors
    </div>
    <Item>Red</Item>
    <Item disabled>
      Green
    </Item>
    <Item>Blue</Item>
    <div :style="{ fontVariant: 'small-caps' }">
      Words
    </div>
    <Item>Hello</Item>
    <Item>World</Item>
    <LogItems />
  </List>
</template>
