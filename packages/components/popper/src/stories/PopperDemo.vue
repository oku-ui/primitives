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
  <div class="h-[200vh] flex justify-center items-center">
    <OkuPopper>
      <OkuPopperAnchor class="h-10 w-10">
        <button class="bg-blue-500" @click="setPressed(!pressed)">
          Toggle
        </button>
      </OkuPopperAnchor>
      <Teleport to="body">
        <Transition>
          <OkuPopperContent v-if="pressed" :side-offset="5" side="top" align="start">
            <button class="bg-blue-500" @click="setPressed(!pressed)">
              close
            </button>
            <OkuPopperArrow class="fill-red-500" width="20" height="20" offset="0" />
          </OkuPopperContent>
        </Transition>
      </Teleport>
    </OkuPopper>
  </div>
</template>

<style scoped>
/*   '0%': { transform: 'scale(0) rotateZ(calc(var(--direction, 0) * 45deg))' },
  '100%': { transform: 'scale(1)' }, */
@keyframes rotateIn {
  0% {
    transform: scale(0) rotateZ(calc(var(--direction, 0) * 45deg));
  }
  100% {
    transform: scale(1);
  }
}
.animatedContentClass {

  &[data-state="top"] {
    --direction: 1;
  }

  &[data-state="bottom"] {
    --direction: -1;
  }

  animation: rotateIn 5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* we will explain what these classes do next! */
.v-enter-from,
.v-enter-active {
  /* transition: opacity 0.5s ease; */
  animation: rotateIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);

   &[data-state="top"] {
    --direction: 1;
  }

  &[data-state="bottom"] {
    --direction: -1;
  }

}

/* .v-enter-from,
.v-leave-to {
  opacity: 0;
} */
</style>
