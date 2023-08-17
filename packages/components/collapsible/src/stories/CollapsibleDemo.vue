<script setup lang="ts">
import { ref } from 'vue'
import { OkuCollapsible, OkuCollapsibleContent, OkuCollapsibleTrigger } from '@oku-ui/collapsible'

export interface ICollapsibleProps {
  template?: '#1' | '#2' | '#3'
  allshow?: boolean
}

withDefaults(defineProps<ICollapsibleProps>(), {})

const close = ref(false)
const open = ref(true)
</script>

<template>
  <div class="container">
    <div v-if="template === '#1' || allshow">
      <OkuCollapsible v-model:open="open" class="root">
        <OkuCollapsibleTrigger class="trigger">
          {{ open ? 'close' : 'open' }}
        </OkuCollapsibleTrigger>
        <OkuCollapsibleContent class="content">
          Content
        </OkuCollapsibleContent>
      </OkuCollapsible>
    </div>

    <div v-if="template === '#2' || allshow">
      <h1 class="text-2xl">
        Uncontrolled
      </h1>
      <h2 class="text-lg">
        Closed
      </h2>
      <OkuCollapsible v-model:open="close" class="root">
        <OkuCollapsibleTrigger class="trigger">
          {{ close ? 'close' : 'open' }}
        </OkuCollapsibleTrigger>
        <OkuCollapsibleContent class="content">
          <article>Content 1</article>
        </OkuCollapsibleContent>
      </OkuCollapsible>
      <h2 class="text-lg">
        open
      </h2>
      <OkuCollapsible v-model:open="open" class="root">
        <OkuCollapsibleTrigger class="trigger">
          {{ open ? 'close' : 'open' }}
        </OkuCollapsibleTrigger>
        <OkuCollapsibleContent class="content">
          <article>Content 1</article>
        </OkuCollapsibleContent>
      </OkuCollapsible>
      <h1 class="text-2xl">
        Controlled
      </h1>
      <h2 class="text-lg">
        Closed
      </h2>
      <OkuCollapsible class="root" :open="false">
        <OkuCollapsibleTrigger class="trigger">
          close
        </OkuCollapsibleTrigger>
        <OkuCollapsibleContent class="content">
          <article>Content 1</article>
        </OkuCollapsibleContent>
      </OkuCollapsible>
      <h2 class="text-lg">
        open
      </h2>
      <OkuCollapsible class="root" :open="true">
        <OkuCollapsibleTrigger class="trigger">
          open
        </OkuCollapsibleTrigger>
        <OkuCollapsibleContent class="content">
          <article>Content 1</article>
        </OkuCollapsibleContent>
      </OkuCollapsible>
      <h1 class="text-2xl">
        disabled
      </h1>
      <OkuCollapsible class="root" :open="false" disabled>
        <OkuCollapsibleTrigger class="trigger">
          close
        </OkuCollapsibleTrigger>
        <OkuCollapsibleContent class="content">
          <article>Content 1</article>
        </OkuCollapsibleContent>
      </OkuCollapsible>
    </div>

    <div v-if="template === '#3' || allshow">
      <OkuCollapsible v-model:open="open" class="root">
        <OkuCollapsibleTrigger class="trigger">
          {{ open ? 'close' : 'open' }}
        </OkuCollapsibleTrigger>
        <OkuCollapsibleContent class="content" :transition="{ name: 'sx' }">
          Content
        </OkuCollapsibleContent>
      </OkuCollapsible>
    </div>
  </div>
</template>

<style>
.root {
  max-width: 20em;
  font-family: sans-serif;
}

.trigger {
  width: 100%;
  text-align: inherit;
  box-sizing: border-box;
  appearance: none;
  border: none;
  padding: 10px;
  background-color: black;
  color: white;
  font-family: inherit;
  font-size: 1.2em;
}

.trigger:focus {
  outline: none;
  box-shadow: inset 0 -5px 0 0 crimson;
  color: red;
}

.trigger[data-disabled] {
  color: gray;
}

.trigger[data-state="open"] {
  background-color: red;
  color: white;
}

.trigger[data-state="open"]:focus {
  color: black;
  box-shadow: inset 0 -5px 0 0 black;
}
</style>
