<script setup lang="ts">
import { shallowRef } from 'vue'
import { RovingFocusGroupRoot } from '../index.ts'
import { provideButtonGroupContext } from './utils.ts'

const props = withDefaults(defineProps<{
  defaultValue?: string
  orientation?: 'horizontal' | 'vertical'
  dir?: 'ltr' | 'rtl'
  loop?: boolean
}>(), {
  dir: 'ltr',
  loop: false,
})

const value = shallowRef(props.defaultValue)

provideButtonGroupContext({
  value,
  setValue(v) {
    value.value = v
  },
})
</script>

<template>
  <RovingFocusGroupRoot
    :dir="dir"
    :loop="loop"
    :orientation="orientation"
    :style="{
      display: 'inline-flex',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      gap: '10px',
    }"
  >
    <slot />
  </RovingFocusGroupRoot>
</template>
