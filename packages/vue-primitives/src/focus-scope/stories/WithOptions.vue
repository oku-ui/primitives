<script setup lang="ts">
import { shallowRef } from 'vue'
import { FocusScope } from '../index.ts'

const open = shallowRef(false)
const isEmptyForm = shallowRef(false)

const trapFocus = shallowRef(false)
const focusOnMount = shallowRef<boolean | 'age'>(false)
const focusOnUnmount = shallowRef<boolean | 'next'>(false)

const ageFieldRef = shallowRef<HTMLInputElement | null>(null)
const nextButtonRef = shallowRef<HTMLButtonElement | null>(null)
</script>

<template>
  <div :style="{ fontFamily: 'sans-serif', textAlign: 'center' }">
    <h1>FocusScope</h1>

    <div :style="{ display: 'inline-block', textAlign: 'left', marginBottom: '20px' }">
      <label :style="{ display: 'block' }">
        <input
          type="checkbox"
          :checked="trapFocus"
          @change="(event: any) => {
            trapFocus = event.target.checked
          }"
        >{{ ' ' }}
        Trap focus?
      </label>
      <label :style="{ display: 'block' }">
        <input
          type="checkbox"
          :checked="focusOnMount !== false"
          @change="(event: any) => {
            focusOnMount = event.target.checked
            if (event.target.checked === false) {
              isEmptyForm = false
            }
          }"
        >
        {{ ' ' }}
        Focus on mount?
      </label>
      <label v-if="focusOnMount !== false && !isEmptyForm" :style="{ display: 'block', marginLeft: '20px' }">
        <input
          type="checkbox"
          :checked="focusOnMount !== true"
          @change="(event: any) => {
            focusOnMount = event.target.checked ? 'age' : true
          }"
        >
        {{ ' ' }}
        on "age" field?
      </label>
      <label v-if="focusOnMount !== false" :style="{ display: 'block', marginLeft: '20px' }">
        <input
          type="checkbox"
          :checked="isEmptyForm"
          @change="(event: any) => {
            isEmptyForm = event.target.checked
            focusOnMount = true
          }"
        >{{ ' ' }}
        empty form?
      </label>
      <label :style="{ display: 'block' }">
        <input
          type="checkbox"
          :checked="focusOnUnmount !== false"
          @change="(event: any) => {
            focusOnUnmount = event.target.checked
          }"
        >
        {{ ' ' }}
        Focus on unmount?
      </label>
      <label v-if="focusOnUnmount !== false" :style="{ display: 'block', marginLeft: '20px' }">
        <input
          type="checkbox"
          :checked="focusOnUnmount !== true"
          @change="(event: any) => {
            focusOnUnmount = event.target.checked ? 'next' : true
          }"
        >{{ ' ' }}
        on "next" button?
      </label>
    </div>

    <div :style="{ marginBottom: 20 }">
      <button
        type="button"
        @click="() => {
          open = !open
        }"
      >
        {{ open ? 'Close' : 'Open' }} form in between buttons
      </button>
    </div>

    <button type="button" :style="{ marginRight: '10px' }">
      previous
    </button>

    <FocusScope
      v-if="open"
      key="form"
      as="template"
      :loop="trapFocus"
      :trapped="trapFocus"
      @mount-auto-focus="(event) => {
        if (focusOnMount !== true) {
          event.preventDefault();
          if (focusOnMount === 'age')
            ageFieldRef?.focus();
        }
      }"
      @unmount-auto-focus="(event) => {
        if (focusOnUnmount !== true) {
          event.preventDefault();
          if (focusOnUnmount === 'next')
            nextButtonRef?.focus();
        }
      }"
    >
      <form
        :style="{
          display: 'inline-flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '20px',
          margin: '50px',
          maxWidth: '500px',
          border: '2px solid',
        }"
      >
        <template v-if="!isEmptyForm">
          <input type="text" placeholder="First name">
          <input type="text" placeholder="Last name">
          <input ref="ageFieldRef" type="number" placeholder="Age">
          <button
            type="button" @click="() => {
              open = false
            }"
          >
            Close
          </button>
        </template>
      </form>
    </FocusScope>

    <button ref="nextButtonRef" type="button" :style="{ marginLeft: '10px' }">
      next
    </button>
  </div>
</template>
