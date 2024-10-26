<script setup lang="ts">
import { shallowRef } from 'vue'
import { FocusScope } from '../index.ts'

const trapped1 = shallowRef(false)
const trapped2 = shallowRef(false)
</script>

<template>
  <div :style="{ display: 'inline-flex', flexDirection: 'column', gap: '10px' }">
    <div>
      <button
        type="button" @click="() => {
          trapped1 = true
        }"
      >
        Trap 1
      </button>
    </div>
    <FocusScope v-if="trapped1" as="template" :loop="trapped1" :trapped="trapped1">
      <form
        :style="{
          display: 'inline-flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '20px',
          maxWidth: '500px',
          border: '2px solid',
        }"
      >
        <h1>One</h1>
        <input type="text" placeholder="First name">
        <input type="text" placeholder="Last name">
        <input type="number" placeholder="Age">
        <button
          type="button" @click="() => {
            trapped1 = false
          }"
        >
          Close
        </button>
      </form>
    </FocusScope>

    <div>
      <button
        type="button" @click="() => {
          trapped2 = true
        }"
      >
        Trap 2
      </button>
    </div>

    <FocusScope v-if="trapped2" as="template" :loop="trapped2" :trapped="trapped2">
      <form
        :style="{
          display: 'inline-flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '20px',
          maxWidth: '500px',
          border: '2px solid',
        }"
      >
        <h1>Two</h1>
        <input type="text" placeholder="First name">
        <input type="text" placeholder="Last name">
        <input type="number" placeholder="Age">
        <button
          type="button" @click="() => {
            trapped2 = false
          }"
        >
          Close
        </button>
      </form>
    </FocusScope>
    <div>
      <input>
    </div>
  </div>
</template>
