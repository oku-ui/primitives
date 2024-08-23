<script setup lang="ts">
import { Teleport, onMounted, shallowRef } from 'vue'
import type { PortalProps } from './Portal.ts'

withDefaults(defineProps<PortalProps>(), {
  to: 'body',
})

const isMounted = shallowRef(false)

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <Teleport
    v-if="isMounted || forceMount"
    :to="to"
    :disabled="disabled"
  >
    <slot />
  </Teleport>
</template>
