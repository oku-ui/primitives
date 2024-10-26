<script setup lang="tsx">
import Item from './item.vue'
import List from './List.vue'
import LogItems from './LogItems.vue'

function Countries() {
  return (
    <>
      <Item>France</Item>
      <Item {...{ disabled: true }}>UK</Item>
      <Item>Spain</Item>
    </>
  )
}
</script>

<template>
  <List>
    <Countries />
    <LogItems />
  </List>
</template>
