<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import type { Ref } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { useComponentRef, useVModel } from '@oku-ui/use-composable'
import { computed } from 'vue'
import {
  defaultGetValueLabel,
  getInvalidMaxError,
  getInvalidValueError,
  getProgressState,
  isNumber,
  isValidMaxNumber,
  isValidValueNumber,
  useProgressProvide,
} from './utils'

const DEFAULT_MAX = 100

export type ProgressElement = HTMLDivElement

export interface ProgressProps extends PrimitiveProps {
  scopeOkuProgress?: Scope
  value?: number | null | undefined
  max?: number
  getValueLabel?: (value: number, max: number) => string
  scopeProgress?: Scope
  valueChange?: (value: number | null | undefined) => void
}

export type ProgressEmits = {
  'update:value': [value: number | null | undefined]
  'valueChange': [value: number | null | undefined]
}

</script>

<script setup lang="ts">

defineOptions({
  name: 'OkuProgress',
})

const props = withDefaults(defineProps<ProgressProps>(), {
  value: undefined,
  max: DEFAULT_MAX,
  getValueLabel: defaultGetValueLabel,
})
const emits = defineEmits<ProgressEmits>()

const { componentRef, currentElement } = useComponentRef<HTMLButtonElement | null>()

const value = useVModel(props, 'value', emits, {
  passive: (props.value === undefined) as false,
  shouldEmit(v: any) {
    emits('valueChange', v)
    return true
  },
}) as Ref<number | null | undefined>

// propstype check
if (props.max && !isValidMaxNumber(props.max))
  console.error(getInvalidMaxError(props.max))

if (props.value != null && !isValidValueNumber(props.value, props.max))
  console.error(getInvalidValueError(props.value))

const maxProp = computed(() =>
  isValidMaxNumber(props.max) ? props.max : DEFAULT_MAX,
)

const valueProp = computed(() =>
  isValidValueNumber(props.value, maxProp.value) ? props.value : null,
)

const valueLabel = computed(() =>
  isNumber(valueProp.value)
    ? props.getValueLabel(valueProp.value, maxProp.value)
    : undefined,
)

useProgressProvide({
  scope: props.scopeOkuProgress,
  value,
  max: maxProp,
})

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <Primitive
    :is="props.is"
    ref="componentRef"
    :as-child="props.asChild"
    :aria-valuemax="props.max"
    :aria-valuemin="0"
    :aria-valuenow="isNumber(props.value) ? props.value : undefined"
    :aria-valuetext="valueLabel"
    role="progressbar"
    :data-state="getProgressState(maxProp, props.value)"
    :data-value="props.value ?? undefined"
    :data-max="maxProp"
  >
    <slot />
  </Primitive>
</template>
