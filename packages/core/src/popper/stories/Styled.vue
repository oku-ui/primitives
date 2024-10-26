<script setup lang="ts">
import { shallowRef } from 'vue'
import { PopperAnchor, PopperArrow, PopperContent, PopperRoot } from '../index.ts'
import Scrollable from './Scrollable.vue'
import './styles.css'

const open = shallowRef(false)

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
        <PopperAnchor class="popper_anchorClass" @click="openFn">
          open
        </PopperAnchor>

        <PopperContent v-if="open" class="popper_contentClass" :side-offset="5">
          <button @click="closeFn">
            close
          </button>
          <PopperArrow class="popper_arrowClass" :width="20" :height="10" />
        </PopperContent>
      </PopperRoot>
    </Scrollable>
  </div>
</template>
