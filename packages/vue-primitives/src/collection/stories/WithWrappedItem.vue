<script setup lang="ts">
import Item from './item.vue'
import List from './List.vue'
import LogItems from './LogItems.vue'
import Tomato from './Tomato.vue'
</script>

<template>
  <List>
    <Item>Red</Item>
    <Item disabled>
      Green
    </Item>
    <Item>Blue</Item>
    <Tomato />
    <LogItems />
  </List>
</template>
