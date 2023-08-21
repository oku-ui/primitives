<script lang="ts" setup>
import { useModel } from 'vue'

const props = defineProps(['open', 'nodeRef'])
const open = useModel(props, 'open')

function handleChange() {
  open.value = !open.value
}

function handleToggleVisibility() {
  console.log(props.nodeRef)
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
      <button type="button" @click="handleChange">
        toggle
      </button>
    </fieldset>
    <fieldset>
      <legend>Visibility (triggers cancel event)</legend>
      <button type="button" @click="handleToggleVisibility">
        toggle
      </button>
    </fieldset>
  </form>
</template>
