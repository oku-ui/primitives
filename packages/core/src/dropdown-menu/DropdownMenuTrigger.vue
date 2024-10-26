<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_DROPDOWN_MENU_TRIGGER_PROPS, type DropdownMenuTriggerProps, useDropdownMenuTrigger } from './DropdownMenuTrigger.ts'

defineOptions({
  name: 'DropdownMenuTrigger',
})

const props = withDefaults(defineProps<DropdownMenuTriggerProps>(), DEFAULT_DROPDOWN_MENU_TRIGGER_PROPS)

const dropdownMenuTrigger = useDropdownMenuTrigger(convertPropsToHookProps(props, ['disabled']))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(dropdownMenuTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
