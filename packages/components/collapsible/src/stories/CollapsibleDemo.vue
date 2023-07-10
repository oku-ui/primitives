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
const open = ref(false)

function setOpenChange(openState: boolean) {
  // console.log('---open---', open, openState)
  open.value = openState
}
</script>

<template>
  <div class="container">
    <div v-if="template === '#1' || allshow">
      <Collapsible class="root">
        <CollapsibleTrigger class="trigger">
          Trigger
        </CollapsibleTrigger>
        <CollapsibleContent class="content">
          Content
        </CollapsibleContent>
      </Collapsible>
    </div>
    <div v-if="template === '#2' || allshow">
      <Collapsible :open="open" :on-open-change="setOpenChange" class="root">
        <CollapsibleTrigger class="trigger">
          {{ open ? 'close' : 'open' }}
        </CollapsibleTrigger>
        <CollapsibleContent class="content">
          <article>Content 1</article>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </div>
</template>

<style>
.root{
  max-width: 20em;
  font-family: sans-serif;
}

.trigger{
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

.trigger:focus{
  outline: none;
  box-shadow: inset 0 -5px 0 0 crimson;
  color: red;
}

.trigger[data-disabled]{
  color: gray;
}

.trigger[data-state="open"]{
  background-color: red;
  color: white;
}

.trigger[data-state="open"]:focus{
  color: black;
  box-shadow: inset 0 -5px 0 0 black;
}
</style>
