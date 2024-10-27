<script setup lang="ts">
import { Primitive } from '@oku-ui/primitive'
import { DEFAULT_SELECT_VALUE_PROPS, type SelectValueProps, useSelectValue } from './SelectValue'

defineOptions({
  name: 'SelectValue',
  inheritAttrs: false,
})

withDefaults(defineProps<SelectValueProps>(), DEFAULT_SELECT_VALUE_PROPS)

const selectValue = useSelectValue()
</script>

<template>
  <Primitive v-bind="selectValue.attrs([$attrs, { as }])">
    <slot v-if="selectValue.showPlaceholder.value" name="placeholder" />
    <slot v-else />
  </Primitive>
</template>
