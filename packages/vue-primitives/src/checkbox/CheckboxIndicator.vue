<script setup lang="ts">
import { shallowRef } from 'vue'
import { usePresence } from '../presence/index.ts'
import { Primitive } from '../primitive/index.ts'
import { forwardRef } from '../utils/vue.ts'
import { useCheckboxContext } from './CheckboxRoot.ts'
import type { CheckboxIndicatorProps } from './CheckboxIndicator.ts'
import { getState, isIndeterminate } from './utils.ts'

defineOptions({
  name: 'CheckboxIndicator',
})

const props = withDefaults(defineProps<CheckboxIndicatorProps>(), {
  as: 'span',
})
const $el = shallowRef<HTMLElement>()
const forwardedRef = forwardRef($el)

const context = useCheckboxContext('CheckboxIndicator')

const isPresent = usePresence($el, () => props.forceMount || isIndeterminate(context.state.value) || context.state.value === true)
</script>

<template>
  <Primitive
    v-if="isPresent"
    :ref="forwardedRef"
    :as="as"
    :data-state="getState(context.state.value)"
    :data-disabled="context.disabled() ? '' : undefined"
    :style="{ pointerEvents: 'none' }"
  >
    <slot />
  </Primitive>
</template>
