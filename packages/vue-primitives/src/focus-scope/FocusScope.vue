<script setup lang="ts">
import { useForwardElement } from '@oku-ui/hooks'
import { Primitive } from '@oku-ui/primitive'
import { shallowRef } from 'vue'
import {
  type FocusScopeEmits,
  type FocusScopeProps,
  useFocusScope,
} from './FocusScope.ts'

defineOptions({
  name: 'FocusScope',
})

const props = defineProps<FocusScopeProps>()
const emit = defineEmits<FocusScopeEmits>()

const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const focusScope = useFocusScope(
  $el,
  props,
  {
    onMountAutoFocus(event) {
      emit('mountAutoFocus', event)
    },
    onUnmountAutoFocus(event) {
      emit('unmountAutoFocus', event)
    },
  },
)
</script>

<template>
  <Primitive
    :ref="forwardElement"
    tabindex="-1"
    @keydown="focusScope.onKeydown"
  >
    <slot />
  </Primitive>
</template>
