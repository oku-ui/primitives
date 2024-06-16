<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { RovingFocusItem } from '../index.ts'
import { composeEventHandlers } from '../../utils/composeEventHandlers.ts'
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
  ;(attrs.onFocus as Function | undefined)?.(event)
}, (event) => {
  if (context.value.value !== undefined) {
    (event.target as HTMLElement).click()
  }
})
</script>

<template>
  <RovingFocusItem as-child :active="isSelected" :focusable="!disabled">
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
            borderColor: 'black',
            backgroundColor: 'black',
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
  </RovingFocusItem>
</template>
