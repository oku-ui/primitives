<script setup lang="ts">
import { convertPropsToHookProps } from '../shared/convertPropsToHookProps.ts'
import { VISUALLY_HIDDEN_STYLE } from '../visually-hidden/index.ts'
import { type ToastAnnounceProps, useToastAnnounce } from './ToastAnnounce.ts'

defineOptions({
  name: 'ToastAnnounce',
  inheritAttrs: false,
})

const props = defineProps<ToastAnnounceProps>()

const toastAnnounce = useToastAnnounce(convertPropsToHookProps(props))
</script>

<template>
  <Teleport v-if="!toastAnnounce.isAnnounced.value" to="body">
    <span
      role="status"
      aria-atomic
      :style="VISUALLY_HIDDEN_STYLE"
      v-bind="$attrs"
    >
      <template v-if="toastAnnounce.renderAnnounceText.value">
        {{ toastAnnounce.label }}
      </template>
    </span>
  </Teleport>
</template>
