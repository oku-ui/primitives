<script setup lang="ts">
import { shallowRef } from 'vue'
import { Portal } from '../../portal/index.ts'
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

        <Portal v-if="open">
          <PopperContent class="popper_contentClass popper_animatedContentClass" :side-offset="5">
            <button @click="closeFn">
              close
            </button>
            <PopperArrow class="popper_arrowClass" :width="20" :height="10" :offset="25" />
          </PopperContent>
        </Portal>
      </PopperRoot>
    </Scrollable>
  </div>
</template>
