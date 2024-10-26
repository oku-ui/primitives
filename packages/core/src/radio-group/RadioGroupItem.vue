<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_RADIO_GROUP_ITEM_PROPS, type RadioGroupItemProps, useRadioGroupItem } from './RadioGroupItem.ts'

defineOptions({
  name: 'RadioGroupItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RadioGroupItemProps>(), DEFAULT_RADIO_GROUP_ITEM_PROPS)

const radioGroupItem = useRadioGroupItem(convertPropsToHookProps(props, ['value', 'disabled', 'name']))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(radioGroupItem.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
