<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { CheckboxRootEmits, CheckboxRootProps } from './CheckboxRoot.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import {

  DEFAULT_CHECKBOX_ROOT_PROPS,
  useCheckboxRoot,
} from './CheckboxRoot.ts'

defineOptions({
  name: 'Checkbox',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<CheckboxRootProps>(), DEFAULT_CHECKBOX_ROOT_PROPS)

const emit = defineEmits<CheckboxRootEmits>()

const checkboxRoot = useCheckboxRoot(convertPropsToHookProps(
  props,
  ['checked', 'disabled', 'required', 'value', 'name'],
  (): Required<EmitsToHookProps<CheckboxRootEmits>> => ({
    onUpdateChecked(checked) {
      emit('update:checked', checked)
    },
  }),
))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(checkboxRoot.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
