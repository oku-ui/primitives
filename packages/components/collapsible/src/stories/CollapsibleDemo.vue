<script setup lang="ts">
import { ref } from 'vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../collapsible'
import type { CollapsibleProps } from '../collapsible'

export interface ICollapsibleProps extends CollapsibleProps {
  template?: '#1' | '#2' | '#3'
  allshow?: boolean
}

withDefaults(defineProps<ICollapsibleProps>(), {})
// ---
const close = ref(false)
const open = ref(true)
</script>

<template>
  <div class="container">
    <div v-if="template === '#1' || allshow">
      <Collapsible v-model:open="open" class="root">
        <CollapsibleTrigger class="trigger">
          {{ open ? 'close' : 'open' }}
        </CollapsibleTrigger>
        <CollapsibleContent class="content">
          Content
        </CollapsibleContent>
      </Collapsible>
    </div>

    <div v-if="template === '#2' || allshow">
      <h1 class="text-2xl">
        Uncontrolled
      </h1>
      <h2 class="text-lg">
        Closed
      </h2>
      <Collapsible v-model:open="close" class="root">
        <CollapsibleTrigger class="trigger">
          {{ close ? 'close' : 'open' }}
        </CollapsibleTrigger>
        <CollapsibleContent class="content">
          <article>Content 1</article>
        </CollapsibleContent>
      </Collapsible>
      <h2 class="text-lg">
        open
      </h2>
      <Collapsible v-model:open="open" class="root">
        <CollapsibleTrigger class="trigger">
          {{ open ? 'close' : 'open' }}
        </CollapsibleTrigger>
        <CollapsibleContent class="content">
          <article>Content 1</article>
        </CollapsibleContent>
      </Collapsible>
      <h1 class="text-2xl">
        Controlled
      </h1>
      <h2 class="text-lg">
        Closed
      </h2>
      <Collapsible class="root" :open="false">
        <CollapsibleTrigger class="trigger">
          close
        </CollapsibleTrigger>
        <CollapsibleContent class="content">
          <article>Content 1</article>
        </CollapsibleContent>
      </Collapsible>
      <h2 class="text-lg">
        open
      </h2>
      <Collapsible class="root" :open="true">
        <CollapsibleTrigger class="trigger">
          open
        </CollapsibleTrigger>
        <CollapsibleContent class="content">
          <article>Content 1</article>
        </CollapsibleContent>
      </Collapsible>
      <h1 class="text-2xl">
        disabled
      </h1>
      <Collapsible class="root" :open="false" disabled>
        <CollapsibleTrigger class="trigger">
          close
        </CollapsibleTrigger>
        <CollapsibleContent class="content">
          <article>Content 1</article>
        </CollapsibleContent>
      </Collapsible>
    </div>

    <div v-if="template === '#3' || allshow">
      <Collapsible v-model:open="open" class="root">
        <CollapsibleTrigger class="trigger">
          {{ open ? 'close' : 'open' }}
        </CollapsibleTrigger>
        <CollapsibleContent class="content" :transition="{ name: 'sx' }">
          Content
        </CollapsibleContent>
      </Collapsible>
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
