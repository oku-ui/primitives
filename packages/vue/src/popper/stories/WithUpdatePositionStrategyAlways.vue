<script setup lang="ts">
import {
  OkuPopper,
  OkuPopperAnchor,
  OkuPopperArrow,
  OkuPopperContent,
} from '@oku-ui/popper'
import { OkuPortal } from '@oku-ui/portal'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Scrollable from './Scrollable.vue'

// const [left, setLeft] = React.useState(0);
// React.useEffect(() => {
//   const intervalId = setInterval(() => {
//     setLeft((prev) => (prev + 50) % 300);
//   }, 500);
//   return () => clearInterval(intervalId);
// }, []);
const open = ref(false)
const left = ref(0)

let intervalId: number | null = null

onMounted(() => {
  intervalId = window.setInterval(() => {
    left.value = (left.value + 50) % 300
  }, 500)
})

onBeforeUnmount(() => {
  if (intervalId)
    clearInterval(intervalId)
})
</script>

<template>
  {{ left }}
  <Scrollable>
    <OkuPopper>
      <OkuPopperAnchor
        class="popper-anchor"
        :style="{
          marginLeft: `${left}px`,
        }"
        @click="open = true"
      >
        open
      </OkuPopperAnchor>

      <OkuPortal v-if="open" as-child>
        <OkuPopperContent
          class="popper-content"
          :side-offset="5"
          update-position-strategy="always"
        >
          <button @click="open = false">
            close
          </button>
          <OkuPopperArrow class="popper-arrow" :width="20" :height="10" />
        </OkuPopperContent>
      </OkuPortal>
    </OkuPopper>
  </Scrollable>
</template>
