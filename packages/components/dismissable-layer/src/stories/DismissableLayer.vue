<script setup lang="ts">
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import { ref } from 'vue'
import { OkuFocusScope } from '@oku-ui/focus-scope'

export interface IDismissableLayerProps {
  template?: '#1' | '#2' | '#3' | '#4'
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
  console.log(event, 'aa')
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
    <div v-if="template === '#1' || allshow" class="flex flex-col">
      <div style="font-family: sans-serif; text-align: center">
        <h1 class="text-3xl text-center font-semibold mb-2">
          DismissableLayer
        </h1>

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
            :disable-outside-pointer-events="disabledOutsidePointerEvents"
            class="inline-flex justify-center items-center align-middle w-[400px] h-[300px] bg-black rounded-xl mb-5"
            :style="{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              verticalAlign: 'middle',
              width: '400px',
              height: '300px',
              backgroundColor: 'black',
              borderRadius: '10px',
              marginBottom: '20px',
            }"
            @escape-key-down="onEscapeKeyDown"
            @pointer-down-outside="onPointerDownOutside"
            @focus-outside="onFocusOutside"
            @dismiss="closeLayer"
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

    <div v-if="template === '#2'" class="flex flex-col">
      <!-- <DismissableBox /> -->
    </div>

    <div v-if="template === '#3'" class="flex flex-col">
      <div class="text-center font-sans">
        <h1 class="text-3xl font-bold mb-2">
          DismissableLayer + FocusScope
        </h1>
        <div class="mb-10">
          <button ref="openButtonRef" type="button" @click="toggleOpen">
            {{ open ? "Close" : "Open" }} layer
          </button>
        </div>

        <template v-if="open">
          <OkuDismissableLayer
            as-child
            disable-outside-pointer-events
            @pointer-down-outside="onPointerDownOutside"
            @dismiss="closeLayer"
          >
            <OkuFocusScope
              trapped
              :style="{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                verticalAlign: 'middle',
                width: '400px',
                height: '300px',
                background: 'black',
                borderRadius: '10px',
                marginBottom: '20px',
              }"
            >
              <input type="text">
            </OkuFocusScope>
          </OkuDismissableLayer>
        </template>

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
