<script lang="ts" setup>
import { useModel } from 'vue'

const props = defineProps(['open', 'nodeRef'])
const open = useModel(props, 'open')

function handleChange() {
  open.value = !open.value
}

function handleToggleVisibility() {
  const node = props.nodeRef
  if (node) {
    if (node.style.display === 'none')
      node.style.display = 'block'
    else
      node.style.display = 'none'
  }
}
</script>

<template>
  <form style="display: flex;margin-bottom: 30px;">
    <fieldset>
      <legend>Mount</legend>
      <button id="button1" type="button" @click="handleChange">
        toggle
      </button>
    </fieldset>
    <fieldset>
      <legend>Visibility (triggers cancel event)</legend>
      <button id="button2" type="button" @click="handleToggleVisibility">
        toggle
      </button>
    </fieldset>
  </form>
</template>

<style scoped>
button {
    appearance: auto;
    text-rendering: auto;
    color: buttontext;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: center;
    align-items: flex-start;
    cursor: default;
    box-sizing: border-box;
    background-color: buttonface;
    writing-mode: horizontal-tb !important;
    margin: 0em;
    padding-block: 1px;
    padding-inline: 6px;
    border-width: 2px;
    border-style: outset;
    border-color: buttonborder;
    border-image: initial;
}

legend {
    display: block;
    padding-inline-start: 2px;
    padding-inline-end: 2px;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
}

fieldset {
    display: block;
    margin-inline-start: 2px;
    margin-inline-end: 2px;
    padding-block-start: 0.35em;
    padding-inline-start: 0.75em;
    padding-inline-end: 0.75em;
    padding-block-end: 0.625em;
    min-inline-size: min-content;
    border-width: 2px;
    border-style: groove;
    border-color: rgb(192, 192, 192);
    border-image: initial;
}
</style>
