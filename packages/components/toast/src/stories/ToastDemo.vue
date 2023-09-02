<script setup lang="ts">
import { OkuToast, OkuToastAction, OkuToastClose, OkuToastDescription, OkuToastProvider, OkuToastTitle, OkuToastViewport } from '@oku-ui/toast'
import { ref, watchEffect } from 'vue'
import type { ComponentProps } from '@oku-ui/primitive'
import ToastUpgradeAvailable from './ToastUpgradeAvailable.vue'
import ToastSubscribeSuccess from './ToastSubscribeSuccess.vue'
import ToastWithProgress from './ToastWithProgress.vue'

export interface IToastProps {
  template?: '#1' | '#2' | '#3' | '#4' | '#5' | '#6' | '#7' | '#8'
  allShow?: boolean
}

withDefaults(defineProps<IToastProps>(), {})

const hasUpgrade = ref(false)
const isSubscribed = ref(false)
const savedCount = ref(0)
const errorCount = ref(0)

watchEffect((onInvalidate) => {
  if (!hasUpgrade.value) {
    const timer = window.setTimeout(() => (hasUpgrade.value = true), 10000)

    onInvalidate(() => window.clearTimeout(timer))
  }
})

const open = ref(false)
const saving = ref(false)

watchEffect((onInvalidate) => {
  if (saving.value) {
    const timer = window.setTimeout(() => (saving.value = false), 2000)

    onInvalidate(() => window.clearTimeout(timer))
  }
})

const toastOneCount = ref(0)
const toastTwoCount = ref(0)

const toastCount = ref(0)

type Direction = ComponentProps<typeof OkuToastProvider>['swipeDirection']

const swipeDirection = ref<Direction>('right')
const timerRef = ref(0)

function handelAnimatedOpen() {
  open.value = false
  window.clearTimeout(timerRef.value)
  timerRef.value = window.setTimeout(() => (open.value = true), 150)
}

const count = ref(0)

const VIEWPORT_PADDING = ref(10)
</script>

<template>
  <div>
    <!-- #1 -->
    <template v-if="template === '#1' || allShow">
      <OkuToastProvider>
        <ToastUpgradeAvailable />
        <OkuToastViewport />
      </OkuToastProvider>
    </template>
    <!-- #2 -->
    <template v-if="template === '#2' || allShow">
      <OkuToastProvider>
        <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="isSubscribed = true">
          subscribe
        </button>
        <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="errorCount++">
          error
        </button>
        <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="savedCount++">
          save
        </button>
        <ToastUpgradeAvailable v-model="hasUpgrade" :open="hasUpgrade" />
        <ToastSubscribeSuccess v-model="isSubscribed" :open="isSubscribed" />

        <OkuToast v-for="(_, index) in errorCount" :key="index" class="error-toast">
          <OkuToastDescription>There was an error</OkuToastDescription>
          <OkuToastAction
            class="button" alt-text="Resubmit the form to try again."
            @click="console.log('try again')"
          >
            Try again
          </OkuToastAction>
        </OkuToast>

        <OkuToast v-for="(_, index) in savedCount" :key="index" class="toast">
          <OkuToastDescription>Successfully saved</OkuToastDescription>
        </OkuToast>

        <OkuToastViewport class="viewport" />
      </OkuToastProvider>
    </template>
    <!-- TODO: Needs OkuDialog Component -->
    <!-- #3 -->
    <!-- <template v-if="template === '#3' || allShow">
      <OkuToastProvider>
        <OkuDialog>
          <OkuDialogTrigger>Open</OkuDialogTrigger>
          <OkuDialogOverlay />
          <OkuDialogContent :style="{ border: '1px solid', width: 300, padding: 30 }">
            <OkuDialogTitle :style="{ margin: 0 }">
              Title
            </OkuDialogTitle>
            <OkuDialogDescription>Description</OkuDialogDescription>
            <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="open = true">
              Open toast
            </button>
            <OkuDialogClose>Close</OkuDialogClose>
          </OkuDialogContent>
        </OkuDialog>

        <OkuToast v-model="open" class="error-toast" :open="open">
          <OkuToastDescription>There was an error</OkuToastDescription>
          <OkuToastAction
            class="button" alt-text="Resubmit the form to try again."
            @click="console.log('try again')"
          >
            Try again
          </OkuToastAction>
        </OkuToast>

        <OkuToastViewport class="viewport" />
      </OkuToastProvider>
    </template> -->
    <!-- #4 -->
    <template v-if="template === '#4' || allShow">
      <OkuToastProvider>
        <form
          @submit.prevent="() => {
            saving = true;
            open = true;
          }"
        >
          <button type="submit" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
            Save
          </button>
          <OkuToast v-model="open" class="toast" :duration="saving ? Infinity : 2000" :open="open">
            <OkuToastDescription v-if="saving">
              Saving&hellip;
            </OkuToastDescription>
            <OkuToastDescription v-else>
              Saved!
            </OkuToastDescription>
          </OkuToast>
        </form>

        <OkuToastViewport class="viewport" />
      </OkuToastProvider>
    </template>
    <!-- #5 -->
    <template v-if="template === '#5' || allShow">
      <OkuToastProvider>
        <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="toastOneCount++">
          Open toast one
        </button>
        <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="toastTwoCount++">
          Open toast two
        </button>

        <OkuToast v-if="toastOneCount > 0" :key="`one-${String(toastOneCount)}`" class="toast">
          <OkuToastDescription>Toast one</OkuToastDescription>
        </OkuToast>

        <OkuToast v-if="toastTwoCount > 0" :key="`two-${String(toastTwoCount)}`" class="toast">
          <OkuToastDescription>Toast two</OkuToastDescription>
        </OkuToast>

        <OkuToastViewport class="viewport" />
      </OkuToastProvider>
    </template>
    <!-- #6 -->
    <template v-if="template === '#6' || allShow">
      <OkuToastProvider>
        <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="toastCount++">
          Add toast
        </button>

        <ToastWithProgress v-for="(_, index) in toastCount" :key="index" />

        <OkuToastViewport class="viewport" />
      </OkuToastProvider>
    </template>
    <!-- #7 -->
    <template v-if="template === '#7' || allShow">
      <OkuToastProvider
        :swipe-direction="swipeDirection"
        :swipe-threshold="(['up', 'down'] as Direction[]).includes(swipeDirection) ? 25 : undefined"
      >
        <button
          type="button"
          class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md"
          @click="handelAnimatedOpen"
        >
          Open
        </button>

        <select
          :value="swipeDirection"
          @change="(event: any) => swipeDirection = (event.currentTarget.value as Direction)"
        >
          <option value="right">
            Slide right
          </option>
          <option value="left">
            Slide left
          </option>
          <option value="up">
            Slide up
          </option>
          <option value="down">
            Slide down
          </option>
        </select>
        <OkuToast v-model="open" class="animated-toast" :open="open">
          <OkuToastDescription>Swipe me {swipeDirection}</OkuToastDescription>
          <OkuToastClose class="button">
            Dismiss
          </OkuToastClose>
        </OkuToast>
        <OkuToastViewport class="viewport" />
      </OkuToastProvider>
    </template>
    <!-- #8 -->
    <template v-if="template === '#8' || allShow">
      <OkuToastProvider>
        <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="count++">
          Add toast
        </button>
        <div
          :style="{ 'display': 'flex', 'justify-content': 'space-between', 'max-width': 700, 'margin': 'auto' }"
        >
          <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
            Focusable before viewport
          </button>

          <OkuToast
            v-for="(_, index) in count"
            :key="index"
            open
            class="toast"
            :data-testid="`toast-${index + 1}`"
          >
            <OkuToastTitle class="title">
              Toast {{ index + 1 }} title
            </OkuToastTitle>
            <!-- <OkuToastDescription class="description">
              Toast {{ index + 1 }} description
            </OkuToastDescription>

            <OkuToastClose class="button" aria-label="Close">
              Toast button {{ index + 1 }}.1
            </OkuToastClose>
            <OkuToastAction
              alt-text="Go and perform an action"
              class="button"
              :style="{ 'margin-top': '10px' }"
            >
              Toast button {{ index + 1 }}.2
            </OkuToastAction> -->
          </OkuToast>
          <OkuToastViewport class="viewport" />

          <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
            Focusable after viewport
          </button>
        </div>
      </OkuToastProvider>
    </template>
  </div>
</template>

<style>
.viewport {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: v-bind(VIEWPORT_PADDING)px;
  gap: v-bind(VIEWPORT_PADDING)px;
  list-style: none;
}

.toast {
  position: relative;
  overflow: hidden;
  list-style: none;
  width: 230px;
  border-radius: 4px;
  border: 1px solid black;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 10px;
  font-size: 12px;
}

.header {
  padding: 5px 10px;
  margin: -10px -10px 10px;
  background: black;
  color: white;
  position: relative;
  height: 22px;
  display: flex;
  align-items: center;
}

.successHeader {
  background: green;
}

.title {
  font-size: inherit;
  font-weight: normal;
}

.description {
  margin: 0;
}

.button {
  border: 1px solid black;
  border-radius: 4px;
  background: gainsboro;
  font-family: inherit;
  padding: 2px 5px;
}

.button:hover,
.button:focus {
  background: royalblue;
  border-color: darkblue;
  color: white;
}

.close {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  padding: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes slideRight {
  from {
    transform: translateX(var(--oku-toast-swipe-end-x));
  }
  to {
    transform: translateX(calc(100% + v-bind(VIEWPORT_PADDING)px));
  }
}

@keyframes slideLeft {
  from {
    transform: translateX(var(--oku-toast-swipe-end-x));
  }
  to {
    transform: translateX(calc(-100% - v-bind(VIEWPORT_PADDING)px));
  }
}

@keyframes slideUp {
  from {
    transform: translateY(var(--oku-toast-swipe-end-y));
  }
  to {
    transform: translateY(calc(-100% - v-bind(VIEWPORT_PADDING)px));
  }
}

@keyframes slideDown {
  from {
    transform: translateY(var(--oku-toast-swipe-end-y));
  }
  to {
    transform: translateY(calc(100% + v-bind(VIEWPORT_PADDING)px));
  }
}

.error-toast {
  display: 'flex';
  align-items: 'center';
  justify-content: 'space-between';
}

[data-state="open"] {
  animation: fadeIn 200ms ease-out;
}

[data-state="closed"] {
  animation: fadeOut 200ms ease-out;
}

[data-swipe="move"] {
  transform: translate(var(--oku-toast-swipe-move-x), var(--oku-toast-swipe-move-y));
}

[data-swipe="cancel"] {
  transform: translate(0, 0);
  transition: transform 200ms ease-out;
}

[data-swipe="end"][data-swipe-direction="right"] {
  animation-name: slideRight;
}

[data-swipe="end"][data-swipe-direction="left"] {
  animation-name: slideRight;
}

[data-swipe="end"][data-swipe-direction="up"] {
  animation-name: slideRight;
}

[data-swipe="end"][data-swipe-direction="down"] {
  animation-name: slideRight;
}

@keyframes loading {
  from {
    transform: 'translateX(-100%)'
  }
  to {
     transform: 'translateX(0%)'
  }
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  overflow: hidden;
  background-color: #ccc;
}

.progress-bar-inner {
  height: 100%;
  background-color: green;
  animation: loading 2000ms linear;
}

.chromatic-viewport {
  display: inline-flex;
  border: 5px solid royalblue;
  flex-direction: column;
  padding: v-bind(VIEWPORT_PADDING)px;
  gap: v-bind(VIEWPORT_PADDING)px;
}
</style>
