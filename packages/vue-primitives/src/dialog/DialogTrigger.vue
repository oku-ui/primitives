<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_DIALOG_TRIGGER_PROPS, type DialogTriggerProps, useDialogTrigger } from './DialogTrigger.ts'

defineOptions({
  name: 'DialogTrigger',
  inheritAttrs: false,
})

withDefaults(defineProps<DialogTriggerProps>(), DEFAULT_DIALOG_TRIGGER_PROPS)

const dialogTrigger = useDialogTrigger()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(dialogTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
