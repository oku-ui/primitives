<script setup lang="ts">
import List from './List.vue'
import LogItems from './LogItems.vue'
import Item from './item.vue'
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
