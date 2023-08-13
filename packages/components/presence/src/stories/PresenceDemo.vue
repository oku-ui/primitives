<!-- eslint-disable no-console -->
<script setup lang="ts">
import { ref, watch } from 'vue'
import { OkuPresence } from '@oku-ui/presence'

export interface OkuPresenceProps {
  template: '#1' | '#2' | '#3'
  allshow?: boolean
}

withDefaults(defineProps<OkuPresenceProps>(), {
  template: '#1',
})

const open = ref(false)

function toggle() {
  open.value = !open.value
}

const element = ref()

watch(element, () => {
  console.log('element', element.value)
})

function handleToggleVisibility() {
  console.log(element.value, 'handleToggleVisibility')
  const node = element.value

  if (node) {
    if (node.style.display === 'none')
      node.style.display = 'block'

    else
      node.style.display = 'none'
  }
}
</script>

<template>
  <div class="cursor-default inline-block">
    <div v-if="template === '#1' || allshow" class="flex flex-col">
      <button @click="toggle">
        toggle - {{ open }}
      </button>
      <OkuPresence ref="element" v-slot="isPresent" :present="open">
        <div>
          content - {{ isPresent }}
        </div>
      </OkuPresence>
    </div>
    <div v-if="template === '#2' || allshow" class="flex flex-col">
      <button @click="toggle">
        toggle - {{ open }}
      </button>
      <Transition name="bounce">
        <OkuPresence :present="open">
          <div>
            content
          </div>
        </OkuPresence>
      </Transition>
    </div>
    <div v-if="template === '#3' || allshow" class="flex flex-col">
      <form class="flex space-x-4 mb-10">
        <fieldset>
          <legend>Mount</legend>
          <button type="button" @click="toggle">
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

      <OkuPresence :present="open">
        <div ref="element">
          content
        </div>
      </OkuPresence>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
