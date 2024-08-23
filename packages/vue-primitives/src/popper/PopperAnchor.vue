<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import Primitive from '../primitive/Primitive.vue'
import { forwardRef } from '../utils/vue.ts'
import { usePopperContext } from './Popper.ts'
import type { PopperAnchorElement, PopperAnchorProps } from './PopperAnchor'

defineOptions({
  name: 'PopperAnchor',
})

const props = defineProps<PopperAnchorProps>()

const context = usePopperContext('PopperAnchor')

const $el = shallowRef<PopperAnchorElement>()
const forwardedRef = forwardRef($el)

onMounted(() => {
  context.onAnchorChange(props.virtualRef?.current || $el.value)
})

defineExpose({
  $el,
})
</script>

<template>
  <Primitive
    v-if="!virtualRef"
    :ref="forwardedRef"
    :as="as"
    :as-child="asChild"
  >
    <slot />
  </Primitive>
</template>
