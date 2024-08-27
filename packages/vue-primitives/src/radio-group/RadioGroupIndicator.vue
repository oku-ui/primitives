<script setup lang="ts">
import { shallowRef } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { usePresence } from '../presence/index.ts'
import { forwardRef } from '../utils/vue.ts'
import { getState, useRadioContext } from './Radio.ts'
import type { RadioGroupIndicatorProps } from './RadioGroupIndicator.ts'

defineOptions({
  name: 'RadioGroupIndicator',
})

const props = withDefaults(defineProps<RadioGroupIndicatorProps>(), {
  as: 'span',
})
const $el = shallowRef<HTMLSpanElement>()
const forwardedRef = forwardRef($el)

const context = useRadioContext('RadioGroupIndicator')

const isPresent = usePresence($el, () => props.forceMount || context.checked())
</script>

<template>
  <Primitive
    v-if="isPresent"
    :ref="forwardedRef"
    :as="as"
    :data-state="getState(context.checked())"
    :data-disabled="context.disabled() ? '' : undefined"
  >
    <slot />
  </Primitive>
</template>
