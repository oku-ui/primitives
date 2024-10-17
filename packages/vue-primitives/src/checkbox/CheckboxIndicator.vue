<script setup lang="ts">
import type { CheckboxIndicatorProps } from './CheckboxIndicator.ts'
import { useForwardElement } from '@oku-ui/hooks'
import { Primitive } from '@oku-ui/primitive'
import { shallowRef } from 'vue'
import { usePresence } from '../presence/index.ts'
import { useCheckboxContext } from './CheckboxRoot.ts'
import { getState, isIndeterminate } from './utils.ts'

defineOptions({
  name: 'CheckboxIndicator',
})

const props = withDefaults(defineProps<CheckboxIndicatorProps>(), {
  as: 'span',
})
const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const context = useCheckboxContext('CheckboxIndicator')

const isPresent = usePresence($el, () => props.forceMount || isIndeterminate(context.state.value) || context.state.value === true)
</script>

<template>
  <Primitive
    v-if="isPresent"
    :ref="forwardElement"
    :as="as"
    :data-state="getState(context.state.value)"
    :data-disabled="context.disabled() ? '' : undefined"
    :style="{ pointerEvents: 'none' }"
  >
    <slot />
  </Primitive>
</template>
