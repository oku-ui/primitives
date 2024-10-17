<script setup lang="ts">
import type { RadioGroupIndicatorProps } from './RadioGroupIndicator.ts'
import { useForwardElement } from '@oku-ui/hooks'
import { Primitive } from '@oku-ui/primitive'
import { shallowRef } from 'vue'
import { usePresence } from '../presence/index.ts'
import { getState, useRadioContext } from './Radio.ts'

defineOptions({
  name: 'RadioGroupIndicator',
})

const props = withDefaults(defineProps<RadioGroupIndicatorProps>(), {
  as: 'span',
})
const $el = shallowRef<HTMLSpanElement>()
const forwardElement = useForwardElement($el)

const context = useRadioContext('RadioGroupIndicator')

const isPresent = usePresence($el, () => props.forceMount || context.checked())
</script>

<template>
  <Primitive
    v-if="isPresent"
    :ref="forwardElement"
    :as="as"
    :data-state="getState(context.checked())"
    :data-disabled="context.disabled() ? '' : undefined"
  >
    <slot />
  </Primitive>
</template>
