<script setup lang="ts">
import type { PortalProps } from './Portal.ts'
import { onMounted, shallowRef } from 'vue'

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
  >
    <slot />
  </Teleport>
</template>
