<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { getState, useSwitchContext } from './Switch.ts'
import type { SwitchThumbProps } from './SwitchThumb.ts'

defineOptions({
  name: 'OkuSwitchThumb',
})

withDefaults(defineProps<SwitchThumbProps>(), {
  as: 'span',
})

const context = useSwitchContext('OkuSwitchThumb')
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :data-state="getState(context.checked.value)"
  >
    <slot />
  </Primitive>
</template>
