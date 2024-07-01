<script setup lang="ts">
import { shallowRef } from 'vue'
import { usePresence } from '../presence/index.ts'
import { Primitive } from '../primitive/index.ts'
import { useCheckboxContext } from './Checkbox.ts'
import type { CheckboxIndicatorProps } from './CheckboxIndicator.ts'
import { getState, isIndeterminate } from './utils.ts'

defineOptions({
  name: 'CheckboxIndicator',
})

const props = withDefaults(defineProps<CheckboxIndicatorProps>(), {
  as: 'span',
})
const elRef = shallowRef<HTMLElement>()

const context = useCheckboxContext()

const isPresent = usePresence(elRef, () => props.forceMount || isIndeterminate(context.state.value) || context.state.value === true)
</script>

<template>
  <Primitive
    v-if="isPresent"
    :ref="(el: any) => elRef = el?.$el"
    :as="as"
    :as-child="asChild"
    :data-state="getState(context.state.value)"
    :data-disabled="context.disabled.value ? '' : undefined"
    :style="{ pointerEvents: 'none' }"
  >
    <slot />
  </Primitive>
</template>
