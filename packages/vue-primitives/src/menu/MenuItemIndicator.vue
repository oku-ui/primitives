<script setup lang="ts">
import { useForwardElement } from '@oku-ui/hooks'
import { Primitive } from '@oku-ui/primitive'
import { shallowRef } from 'vue'
import { isIndeterminate } from '../checkbox/utils.ts'
import { usePresence } from '../presence/index.ts'
import { type MenuItemIndicatorProps, useItemIndicatorContext } from './MenuItemIndicator.ts'
import { getCheckedState } from './utils.ts'

defineOptions({
  name: 'MenuItemIndicator',
})

const props = withDefaults(defineProps<MenuItemIndicatorProps>(), {
  as: 'span',
})

const indicatorContext = useItemIndicatorContext('MenuItemIndicator')

const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const isPresent = usePresence($el, () => props.forceMount || isIndeterminate(indicatorContext.checked()) || indicatorContext.checked() === true)
</script>

<template>
  <Primitive
    v-if="isPresent"
    :ref="forwardElement"
    :as="as"
    :data-state="getCheckedState(indicatorContext.checked())"
  >
    <slot />
  </Primitive>
</template>
