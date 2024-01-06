<script setup lang="ts">
import { ref } from 'vue'
import type { FocusScopeProps } from '@oku-ui/focus-scope'
import { OkuFocusScope } from '@oku-ui/focus-scope'

export interface IFocusScopeProps extends FocusScopeProps {
  template?: '#1' | '#2' | '#3'
  allshow?: boolean
}

withDefaults(defineProps<IFocusScopeProps>(), {})

type FocusParam = boolean | HTMLElement | null | 'age' | 'next' | 'form'

const trapped = ref<boolean>(false)

const hasDestroyButton = ref<boolean>(true)

const trapped1 = ref<boolean>(false)

const trapped2 = ref<boolean>(false)

const isOpen = ref<boolean>(false)

const isEmptyForm = ref<boolean>(false)

const trapFocus = ref<boolean>(false)

const focusOnMount = ref<FocusParam>(false)
const focusOnUnmount = ref<FocusParam>(false)

const ageFieldRef = ref<HTMLInputElement | null>(null)
const nextButtonRef = ref<HTMLButtonElement | null>(null)
const refForm = ref<HTMLFormElement | null>(null)

function onMountAutoFocus(event: Event) {
  if (focusOnMount.value !== true) {
    event.preventDefault()
    if (focusOnMount.value === 'age')
      ageFieldRef.value?.focus()
    if (focusOnMount.value === 'next')
      nextButtonRef.value?.focus()
    if (focusOnMount.value === 'form')
      refForm.value?.focus()
  }
}
// TODO: waiting fix focusScope close  event
function onUnmountAutoFocus(event: Event) {
  if (focusOnUnmount.value !== true) {
    event.preventDefault()
    if (focusOnUnmount.value === 'age')
      ageFieldRef.value?.focus()
    if (focusOnUnmount.value === 'next')
      nextButtonRef.value?.focus()
    if (focusOnUnmount.value === 'form')
      refForm.value?.focus()
  }
}
</script>

<template>
  <div>
    <!-- #1 -->
    <template v-if="template === '#1' || allshow">
      <div>
        <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="trapped = true">
          Trap
        </button>
        <input
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        >
        <input
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        >
      </div>

      <OkuFocusScope v-if="trapped" as-child :loop="trapped" :trapped="trapped">
        <form class="inline-flex flex-col gap-5 p-5 m-[50px] max-w-[500px] border-2 border-gray-300">
          <input
            type="text" placeholder="First name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
          <input
            type="text" placeholder="Last name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
          <input
            type="number" placeholder="Age"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >

          <div v-if="hasDestroyButton">
            <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="hasDestroyButton = false">
              Destroy me
            </button>
          </div>

          <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="trapped = false">
            Close
          </button>
        </form>
      </OkuFocusScope>

      <div>
        <input
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        >
        <input
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        >
      </div>
    </template>
    <!-- #2 -->
    <template v-if="template === '#2' || allshow">
      <div class="inline-flex flex-col gap-[10px]">
        <div>
          <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="trapped1 = true">
            Trap 1
          </button>
        </div>

        <OkuFocusScope v-if="trapped1" as-child :loop="trapped1" :trapped="trapped1">
          <form class="inline-flex flex-col gap-5 p-5 m-[50px] max-w-[500px] border-2 border-gray-300">
            <h1>One</h1>
            <input
              type="text" placeholder="First name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
            <input
              type="text" placeholder="Last name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
            <input
              type="number" placeholder="Age"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
            <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="trapped1 = false">
              Close
            </button>
          </form>
        </OkuFocusScope>

        <div>
          <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="trapped2 = true">
            Trap 2
          </button>
        </div>

        <OkuFocusScope v-if="trapped2" as-child :loop="trapped2" :trapped="trapped2">
          <form class="inline-flex flex-col gap-5 p-5 m-[50px] max-w-[500px] border-2 border-gray-300">
            <h1>Two</h1>
            <input
              type="text" placeholder="First name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
            <input
              type="text" placeholder="Last name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
            <input
              type="number" placeholder="Age"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            >
            <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="trapped2 = false">
              Close
            </button>
          </form>
        </OkuFocusScope>

        <div>
          <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
        </div>
      </div>
    </template>
    <!-- #3 -->
    <template v-if="template === '#3' || allshow">
      <div class="font-sans text-center">
        <h1>OkuFocusScope</h1>

        <div class="inline-block text-left mb-5">
          <label class="block">
            <input
              type="checkbox" :checked="trapFocus"
              @change="(event) => trapFocus = (event.target as HTMLInputElement).checked"
            >
            Trap focus?
          </label>

          <label class="block">
            <input
              type="checkbox" :checked="focusOnMount !== false"
              @change="(event) => { focusOnMount = (event.target as HTMLInputElement).checked; if ((event.target as HTMLInputElement).checked === false) { isEmptyForm = false } }"
            >
            Focus on mount?
          </label>

          <label v-if="focusOnMount !== false && !isEmptyForm" class="block ml-5">
            <input
              type="checkbox" :checked="focusOnMount !== true"
              @change="(event) => focusOnMount = (event.target as HTMLInputElement).checked ? 'age' : true"
            >
            on "age" field?
          </label>

          <label v-if="focusOnMount !== false" class="block ml-5">
            <input
              type="checkbox" :checked="isEmptyForm"
              @change="(event) => { isEmptyForm = (event.target as HTMLInputElement).checked; focusOnMount = 'form' }"
            >
            empty form?
          </label>

          <label class="block">
            <input
              type="checkbox" :checked="focusOnUnmount !== false"
              @change="(event) => focusOnUnmount = (event.target as HTMLInputElement).checked"
            >
            Focus on unmount?
          </label>

          <label v-if="focusOnUnmount !== false" class="block ml-5">
            <input
              type="checkbox" :checked="focusOnUnmount !== true"
              @change="(event) => focusOnUnmount = (event.target as HTMLInputElement).checked ? 'next' : true"
            >
            on "next" button?
          </label>
        </div>

        <div class="mb-5">
          <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="isOpen = !isOpen">
            {{ isOpen ? 'Close' : 'Open' }}
            form in between buttons
          </button>
        </div>

        <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md mr-[10px]">
          previous
        </button>

        <OkuFocusScope
          v-if="isOpen"
          ref="refForm" key="form" as-child :loop="trapFocus" :trapped="trapFocus"
          @mount-auto-focus="onMountAutoFocus"
          @unmount-auto-focus="onUnmountAutoFocus"
        >
          <form class="inline-flex flex-col gap-5 p-5 m-[50px] max-w-[500px] border-2 border-gray-300">
            <template v-if="!isEmptyForm">
              <input
                type="text" placeholder="First name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
              <input
                type="text" placeholder="Last name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
              <input
                ref="ageFieldRef"
                type="number"
                placeholder="Age"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
              <button type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md" @click="isOpen = false">
                Close
              </button>
            </template>
          </form>
        </OkuFocusScope>

        <button ref="nextButtonRef" type="button" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md ml-[10px]">
          next
        </button>
      </div>
    </template>
  </div>
</template>
