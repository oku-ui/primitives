<script setup lang="ts">
import Item from './item.vue'
import List from './List.vue'
import LogItems from './LogItems.vue'
</script>

<template>
  <List>
    <Item>Red</Item>
    <Item disabled>
      Green
    </Item>
    <Item>Blue</Item>
    <LogItems />
  </List>
</template>
