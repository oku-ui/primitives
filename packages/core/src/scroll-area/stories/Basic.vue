<script setup lang="ts">
import { shallowRef } from 'vue'
import Copy from './Copy.vue'
import ScrollAreaStory from './ScrollAreaStory.vue'

const props = shallowRef<any>({})

function onChange(event: Event) {
  const formData = new FormData(event.currentTarget as HTMLFormElement)
  const entries = (formData as any).entries()
  const cleanup = [...entries].map(([key, value]: any) => [key, value || undefined])
  const _props = Object.fromEntries(cleanup)
  _props.scrollHideDelay = Number(_props.scrollHideDelay) || undefined
  props.value = _props
}
</script>

<template>
  <div>
    <div
      :style="{
        margin: '20px auto',
        width: 'max-content',
        textAlign: 'center',
      }"
    >
      <form
        @input="onChange"
      >
        <label>
          type:{{ ' ' }}
          <select name="type">
            <option />
            <option>always</option>
            <option>auto</option>
            <option>scroll</option>
            <option>hover</option>
          </select>
        </label>{{ ' ' }}
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

    <ScrollAreaStory
      :key="props.type"
      v-bind="props"
      :style="{
        width: '500px',
        height: '500px',
        margin: '30px auto',
      }"
    >
      <Copy v-for="(_, index) in 30" :key="index" />
    </ScrollAreaStory>
  </div>
</template>
