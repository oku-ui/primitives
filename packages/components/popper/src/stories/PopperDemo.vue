<script setup lang="ts">
import { OkuPopper, OkuPopperAnchor, OkuPopperArrow, OkuPopperContent } from '@oku-ui/popper'

import { ref } from 'vue'

export interface IPopperProps {
  template?: '#1' | '#2' | '#3'
  allShow?: boolean
}

withDefaults(defineProps<IPopperProps>(), {

})

const pressed = ref(false)
function setPressed(value: boolean) {
  pressed.value = value
}

const customArrow = ref()
// TODO: more example adds
</script>

<template>
  <div v-if="template === '#1'" class="h-[200vh] flex justify-center items-center">
    <OkuPopper>
      <OkuPopperAnchor class="h-10 w-10 flex items-center">
        <button class="bg-blue-500" @click="setPressed(!pressed)">
          Toggle
        </button>
      </OkuPopperAnchor>
      <Teleport to="body">
        <Transition name="fade">
          <OkuPopperContent v-show="pressed" :side-offset="15" side="top" align="start">
            <button class="bg-blue-500" @click="setPressed(!pressed)">
              close
            </button>
            <OkuPopperArrow class="fill-red-500" width="12" height="12" offset="0" />
          </OkuPopperContent>
        </Transition>
      </Teleport>
    </OkuPopper>
  </div>

  <div v-if="template === '#2'" class="flex justify-center items-center">
    <OkuPopper>
      <OkuPopperAnchor class="h-10 w-10 flex items-center">
        <button class="bg-blue-500" @click="setPressed(!pressed)">
          Toggle
        </button>
      </OkuPopperAnchor>
      <Teleport to="body">
        <Transition name="fade">
          <OkuPopperContent v-show="pressed" :side-offset="5" side="right" align="start">
            <button @click="setPressed(!pressed)">
              close
            </button>
            <OkuPopperArrow as-child class="bg-gray-200" offset="20">
              <div class="w-20 h-5 rounded-bl-xl rounded-br-xl bg-red-500" />
            </OkuPopperArrow>
          </OkuPopperContent>
        </Transition>
      </Teleport>
    </OkuPopper>
  </div>
</template>

<style lang="postcss">
@keyframes rotateIn {
  0% {
    transform: scale(0) rotateZ(calc(var(--direction, 0) * 45deg));
  }
  100% {
    transform: scale(1)
  }
}

.fade-enter-from {
  transform: scale(0) rotateZ(calc(var(--direction, 0) * 45deg));
}

.fade-enter-to {
  transform: scale(1)
}

.fade-enter-active {
  animation: rotateIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &[data-state='top'] {
    --direction: 1;
  }

  &[data-state='bottom'] {
    --direction: -1;
  }
}

.fade-leave-to {
  animation: rotateIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) reverse;
}
</style>
