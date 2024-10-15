<script setup lang="ts">
import { toRefs } from 'vue'
import { visuallyHiddenContentProvider } from './utils'
import type { Scope } from '@oku-ui/provide'

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
