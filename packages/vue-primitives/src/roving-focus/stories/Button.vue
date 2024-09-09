<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { isFunction } from '../../utils/is.ts'
import { composeEventHandlers } from '../../utils/vue.ts'
import { RovingFocusGroupItem } from '../index.ts'
import { useButtonGroupContext } from './utils.ts'

const props = withDefaults(defineProps<{
  value: string
  disabled?: boolean
}>(), {
  disabled: false,
})
const attrs = useAttrs()

const context = useButtonGroupContext('button')

const isSelected = computed(() => context.value.value !== undefined
  && props.value !== undefined
  && context.value.value === props.value)

const onFocus = composeEventHandlers((event) => {
  if (isFunction(attrs.onFocus))
    attrs.onFocus(event)
}, (event) => {
  if (context.value.value !== undefined) {
    (event.target as HTMLElement).click()
  }
})
</script>

<template>
  <RovingFocusGroupItem as="template" :active="isSelected" :focusable="!disabled">
    <button
      :value="value"
      :disabled="disabled"
      :style="{
        border: '1px solid',
        borderColor: '#ccc',
        padding: '5px 10px',
        borderRadius: '5px',
        ...(isSelected
          ? {
            borderColor: '#111',
            backgroundColor: '#111',
            color: 'white',
          }
          : {}),
      }"
      v-bind="{
        ...attrs,
        onClick: () => {
          if (disabled)
            return

          context.setValue(value)
        },
        onFocus,
      }"
    >
      <slot />
    </button>
  </RovingFocusGroupItem>
</template>
