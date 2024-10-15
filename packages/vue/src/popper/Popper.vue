<script lang="ts">
import { defineOptions, ref } from 'vue'
import { usePopperProvide } from './utils'

export interface ScopePopper {
  scopeOkuPopper?: any
}

</script>

<script setup lang="ts">
import type { Measurable } from '@oku-ui/utils'

export interface PopperProps extends ScopePopper {
}

defineOptions({
  name: 'OkuPopper',
})

const props = defineProps<PopperProps>()

const anchor = ref<Measurable | null>(null)

usePopperProvide({
  scope: props.scopeOkuPopper,
  anchor,
  onAnchorChange(value: Measurable | null) {
    anchor.value = value
  },
})
</script>

<template>
  <slot />
</template>
