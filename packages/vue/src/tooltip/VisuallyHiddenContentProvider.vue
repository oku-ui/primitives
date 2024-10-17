<script setup lang="ts">
import type { Scope } from '@oku-ui/provide'
import { toRefs } from 'vue'
import { visuallyHiddenContentProvider } from './utils'

interface VisuallyHiddenContentProviderProps {
  scope: Scope
  isInside: boolean
}

const props = withDefaults(defineProps<VisuallyHiddenContentProviderProps>(), {
  isInside: false,
})

const { scope, isInside } = toRefs(props)

visuallyHiddenContentProvider({
  scope: scope.value,
  isInside,
})
</script>

<template>
  <slot />
</template>
