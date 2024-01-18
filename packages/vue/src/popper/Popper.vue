<script lang="ts">
import { createScope } from '@oku-ui/provide'
import { defineOptions, ref } from 'vue'

export interface ScopePopper {
  scopeOkuPopper?: any
}

export const { composeProviderScopes, createProvide }
    = createScope<PopperProvide['_names']>('OkuPopper')

export type PopperProvide = {
  _names: 'OkuPopper' | 'OkuPopperContent'
  anchor: Ref<Measurable | null>
  onAnchorChange(anchor: Measurable | null): void
}

export const { useProvider, useInject: usePopperInject }
    = createProvide<Omit<PopperProvide, '_names'>>('OkuPopper')
</script>

<script setup lang="ts">
import type { Ref } from 'vue'

import type { Measurable } from '@oku-ui/utils'

export interface PopperProps extends ScopePopper {
}

defineOptions({
  name: 'OkuPopper',
  inheritAttrs: false,
})

const props = defineProps<PopperProps>()

const anchor = ref<Measurable | null>(null)

useProvider({
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
