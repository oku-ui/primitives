<script setup lang="tsx">
import List from './List.vue'
import LogItems from './LogItems.vue'
import Item from './item.vue'

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
