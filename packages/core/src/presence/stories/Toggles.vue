<script setup lang="ts">
import type { PropType, Ref } from 'vue'
import './styles.css'

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  getNode: {
    type: Function as PropType<() => Ref<HTMLElement | undefined>>,
    required: true,
  },
})

const emit = defineEmits(['openChange'])

const nodeRef = props.getNode()

function handleToggleVisibility() {
  const node = nodeRef.value

  if (!node)
    return

  if (node.style.display === 'none') {
    node.style.display = 'block'
  }
  else {
    node.style.display = 'none'
  }
}
</script>

<template>
  <form :style="{ display: 'flex', marginBottom: '30px' }">
    <fieldset>
      <legend>Mount</legend>
      <button type="button" @click="() => emit('openChange', !props.open)">
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
