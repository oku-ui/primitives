<script setup lang="ts">
import { Primitive } from '../primitive'
import { DEFAULT_SELECT_ICON_PROPS, type SelectIconProps } from './SelectIcon'

defineOptions({
  name: 'SelectLabel',
})

withDefaults(defineProps<SelectIconProps>(), DEFAULT_SELECT_ICON_PROPS)

</script>

<template>
  <Primitive :as="as" aria-hidden>
    <slot>▼</slot>
  </Primitive>
</template>
