<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_SWITCH_THUMB_PROPS, type SwitchThumbProps, useSwitchThumb } from './SwitchThumb.ts'

defineOptions({
  name: 'SwitchThumb',
  inheritAttrs: false,
})

withDefaults(defineProps<SwitchThumbProps>(), DEFAULT_SWITCH_THUMB_PROPS)

const context = useSwitchThumb()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(context.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
