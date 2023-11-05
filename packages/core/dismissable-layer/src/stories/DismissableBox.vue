<script setup lang="ts">
import { ref } from 'vue'
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'

const open = ref(false)
const openButtonRef = ref<HTMLButtonElement | null>(null)
</script>

<template>
  <OkuDismissableLayer
    v-bind="$attrs"
    :style="{
      display: 'inline-block',
      verticalAlign: 'middle',
      padding: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '10px',
      marginTop: '20px',
    }"
  >
    <div>
      <button ref="openButtonRef" type="button" @click="open = !open">
        {{ open ? "Close" : "Open" }} new layer
      </button>
    </div>

    <template v-if="open">
      <DismissableBox
        @pointerdown-outside="(event) => {
          if (event.target === openButtonRef)
            event.preventDefault()
        }"
        @focus-outside="(event) => event.preventDefault()"
        @dismiss="open = false"
      />
    </template>
  </OkuDismissableLayer>
</template>
