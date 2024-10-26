<script setup lang="ts">
import { shallowRef, watchEffect } from 'vue'
import { Portal } from '../../portal/index.ts'
import { PopperAnchor, PopperArrow, PopperContent, PopperRoot } from '../index.ts'
import Scrollable from './Scrollable.vue'
import './styles.css'

const open = shallowRef(false)
const left = shallowRef(0)

if (typeof window !== 'undefined') {
  watchEffect((onCleanup) => {
    const intervalId = setInterval(() => {
      const prev = left.value
      left.value = (prev + 50) % 300
    }, 500)

    onCleanup(() => {
      clearInterval(intervalId)
    })
  })
}

function openFn() {
  open.value = true
}

function closeFn() {
  open.value = false
}
</script>

<template>
  <div>
    <Scrollable>
      <PopperRoot>
        <PopperAnchor
          class="popper_anchorClass"
          :style="{ marginLeft: `${left}px` }"
          @click="openFn"
        >
          open
        </PopperAnchor>

        <Portal v-if="open">
          <PopperContent
            class="popper_contentClass"
            :side-offset="5"
            update-position-strategy="always"
          >
            <button @click="closeFn">
              close
            </button>
            <PopperArrow class="popper_arrowClass" :width="20" :height="10" />
          </PopperContent>
        </Portal>
      </PopperRoot>
    </Scrollable>
  </div>
</template>
