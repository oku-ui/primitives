<script setup lang="ts">
import { OkuProgress } from '@oku-ui/progress'
import { ref } from 'vue'
import Sx from './sx.vue'

const value = ref(20)

function add() {
  value.value += 1
  // console.log(value.value)
}
</script>

<template>
  <button @click="add">
    +1
  </button>
  {{ value }}
  <OkuProgress :max="200" :value="value" />
  <Sx :sx="value" />
</template>
