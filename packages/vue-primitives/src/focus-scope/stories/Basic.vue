<script setup lang="ts">
import { shallowRef } from 'vue'
import { FocusScope } from '../index.ts'

const trapped = shallowRef(false)
const hasDestroyButton = shallowRef(true)
</script>

<template>
  <div>
    <div>
      <button
        type="button" @click="() => {
          trapped = true
        }"
      >
        Trap
      </button>{{ ' ' }}
      <input> <input>
    </div>

    <FocusScope v-if="trapped" as="template" :loop="trapped" :trapped="trapped">
      <form
        :style="{
          display: 'inline-flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '20px',
          margin: '50px',
          maxWidth: '500px',
          border: '2px solid',
        }"
      >
        <input type="text" placeholder="First name">
        <input type="text" placeholder="Last name">
        <input type="number" placeholder="Age">
        <div v-if="hasDestroyButton">
          <button
            type="button" @click="() => {
              hasDestroyButton = false
            }"
          >
            Destroy me
          </button>
        </div>
        <button
          type="button" @click="() => {
            trapped = false
          }"
        >
          Close
        </button>
      </form>
    </FocusScope>
    <div>
      <input> <input>
    </div>
  </div>
</template>
