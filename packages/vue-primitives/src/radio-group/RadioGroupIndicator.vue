<script setup lang="ts">
import { shallowRef } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { usePresence } from '../presence/index.ts'
import { getState, useRadioContext } from './Radio.ts'
import type { RadioGroupIndicatorProps } from './RadioGroupIndicator.ts'

defineOptions({
  name: 'RadioGroupIndicator',
})

const props = withDefaults(defineProps<RadioGroupIndicatorProps>(), {
  as: 'span',
})
const elRef = shallowRef<HTMLSpanElement>()

const context = useRadioContext('RadioGroupIndicator')

const isPresent = usePresence(elRef, () => props.forceMount || context.checked())
</script>

<template>
  <Primitive
    v-if="isPresent"
    :ref="(el: any) => elRef = el?.$el"
    :as="as"
    :as-child="asChild"
    :data-state="getState(context.checked())"
    :data-disabled="context.disabled() ? '' : undefined"
  >
    <slot />
  </Primitive>
</template>
