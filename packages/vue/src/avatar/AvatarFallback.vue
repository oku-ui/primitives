<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'

export interface AvatarFallbackProps extends PrimitiveProps {
  scopeOkuAvatar?: any
  delayMs?: number
}
</script>

<script setup lang="ts">
import { defineOptions, onBeforeUnmount, onMounted, ref } from 'vue'
import { useComponentRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { useAvatarInject } from './Avatar.vue'

defineOptions({
  name: 'OkuAvatarFallback',
})

const props = withDefaults(defineProps<AvatarFallbackProps>(), {
  is: 'span',
})

const { componentRef, currentElement } = useComponentRef<HTMLLabelElement | null>()

let timerId: number

const inject = useAvatarInject('OkuAvatar', props.scopeOkuAvatar)
const canRender = ref(props.delayMs === undefined)

function setupTimer() {
  if (props.delayMs !== undefined)
    timerId = window.setTimeout(() => canRender.value = true, props.delayMs)
}

onMounted(() => setupTimer())

onBeforeUnmount(() => window.clearTimeout(timerId))

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <Primitive
    v-if="canRender && inject.imageLoadingStatus.value !== 'loaded'"
    v-bind="props"
    ref="componentRef"
  >
    <slot />
  </Primitive>
</template>
