<script setup lang="ts">
import { ref } from 'vue'
import ScrollAreaStory from './ScrollAreaStory.vue'
import Copy from './Copy.vue'

const props = ref({} as any)

function handleChange(event: Event) {
  const formData = new FormData(event.currentTarget as HTMLFormElement)
  const entries = (formData as any).entries()
  const cleanup = [...entries].map(([key, value]: any) => [key, key === 'scrollHideDelay' && value ? Number(value) : value || undefined])
  props.value = Object.fromEntries(cleanup)
}
</script>

<template>
  <div :style="{ margin: '20px auto', width: 'max-content', textAlign: 'center' }">
    <form @change="handleChange">
      <label>
        type:{{ ' ' }}
        <select name="type">
          <option />
          <option>always</option>
          <option>auto</option>
          <option>scroll</option>
          <option>hover</option>
        </select>
      </label>
      <label>
        dir:{{ ' ' }}
        <select name="dir">
          <option />
          <option>ltr</option>
          <option>rtl</option>
        </select>
      </label>{{ ' ' }}
      <label>
        scrollHideDelay: <input type="number" name="scrollHideDelay">
      </label>
    </form>
  </div>

  <ScrollAreaStory :key="props.type" v-bind:="props" :style="{ width: '800px', height: '800px', margin: '30px auto' }">
    <Copy v-for="(_, index) in 30" :key="index" />
  </ScrollAreaStory>
</template>
