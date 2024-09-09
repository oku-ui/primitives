<script setup lang="ts">
import Item from './item.vue'
import List from './List.vue'
import LogItems from './LogItems.vue'
</script>

<template>
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
</template>
