<script setup lang="ts">
import type { DismissableLayerProps } from '@oku-ui/dismissable-layer'
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import { ref } from 'vue'

export interface IDismissableLayerProps extends DismissableLayerProps {
  template?: '#1'
  allshow?: boolean
}

defineProps<IDismissableLayerProps>()

const openButtonRef = ref<HTMLButtonElement | null>(null)
const open = ref(false)
const dismissOnEscape = ref(false)
const dismissOnPointerDownOutside = ref(false)
const dismissOnFocusOutside = ref(false)
const disabledOutsidePointerEvents = ref(false)

function toggleOpen() {
  open.value = !open.value
}

function onEscapeKeyDown(event: Event): void {
  if (dismissOnEscape.value === false)
    event.preventDefault()
}

function onPointerDownOutside(event: Event): void {
  if (
    dismissOnPointerDownOutside.value === false
    || event.target === openButtonRef.value
  )
    event.preventDefault()
}

function onFocusOutside(event: Event): void {
  if (dismissOnFocusOutside.value === false)
    event.preventDefault()
}

function closeLayer() {
  open.value = false
}

function handleMouseDown() {
  alert('hey!')
}
</script>

<template>
  <div>
    <h1>Oku Basic Dismissable Layer</h1>
    <div v-if="template === '#1' || allshow" class="flex flex-col">
      <div style="font-family: sans-serif; text-align: center">
        <h1>DismissableLayer</h1>

        <div
          style="display: inline-block; text-align: left; margin-bottom: 20px"
        >
          <label class="block">
            <input v-model="dismissOnEscape" type="checkbox"> Dismiss on
            escape?
          </label>

          <label class="block">
            <input v-model="dismissOnPointerDownOutside" type="checkbox">
            Dismiss on pointer down outside?
          </label>

          <label class="block">
            <input v-model="dismissOnFocusOutside" type="checkbox"> Dismiss on
            focus outside?
          </label>

          <hr>

          <label class="block">
            <input v-model="disabledOutsidePointerEvents" type="checkbox">
            Disable outside pointer events?
          </label>
        </div>

        <div style="margin-bottom: 20px">
          <button ref="openButtonRef" @click="toggleOpen">
            {{ open ? "Close" : "Open" }} layer
          </button>
        </div>

        <div v-if="open">
          <OkuDismissableLayer
            :on-escape-key-down="onEscapeKeyDown"
            :on-pointer-down-outside="onPointerDownOutside"
            :on-focus-outside="onFocusOutside"
            :disable-outside-pointer-events="disabledOutsidePointerEvents"
            :on-dismiss="closeLayer"
            class="inline-flex justify-center items-center align-middle w-[400px] h-[300px] bg-black rounded-xl mb-5"
          >
            <input type="text">
          </OkuDismissableLayer>
        </div>

        <div style="margin-bottom: 20px">
          <input type="text" defaultValue="hello" style="margin-right: 20px">
          <button @mousedown="handleMouseDown">
            hey!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
