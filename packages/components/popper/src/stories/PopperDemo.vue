<script setup lang="ts">
// import type { PopperProps } from '@oku-ui/popper'
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

// const animatedContentClass = css(contentClass, {
//   '&[data-side="top"]': { '--direction': '1' },
//   '&[data-side="bottom"]': { '--direction': '-1' },
//   animation: `${rotateIn} 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
// });
</script>

<template>
  <div>
    <OkuPopper>
      <OkuPopperAnchor class="h-10 w-10">
        <button class="bg-blue-500" @click="setPressed(!pressed)">
          Toggle
        </button>
      </OkuPopperAnchor>
      <Teleport to="body">
        <OkuPopperContent v-if="pressed" :side-offset="5" side="top" align="start">
          <button class="bg-blue-500" @click="setPressed(!pressed)">
            close
          </button>
          <OkuPopperArrow class="fill-red-500 bg-red-500" width="20" height="10" offset="0" />
        </OkuPopperContent>
      </Teleport>
    </OkuPopper>
  </div>
</template>

<style scoped>
.animatedContentClass {
  --direction: 1;
  animation: rotateIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  animation-direction: var(--direction);
}
</style>
