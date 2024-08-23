<script setup lang="ts">
import './styles.css'
import { shallowRef, watchEffect } from 'vue'
import { Popper, PopperAnchor, PopperContent } from '../index.ts'
import PopperArrow from '../PopperArrow.vue'
import { Portal } from '../../portal/index.ts'
import Scrollable from './Scrollable.vue'

const open = shallowRef(false)
const left = shallowRef(0)

watchEffect((onCleanup) => {
  const intervalId = setInterval(() => {
    const prev = left.value
    left.value = (prev + 50) % 300
  }, 500)

  onCleanup(() => {
    clearInterval(intervalId)
  })
})

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
      <Popper>
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
      </Popper>
    </Scrollable>
  </div>
</template>
