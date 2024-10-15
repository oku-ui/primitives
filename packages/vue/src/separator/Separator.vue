<script lang="ts">
import { computed, onMounted } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import type { PrimitiveProps } from '@oku-ui/primitive'
import { useComponentRef } from '@oku-ui/use-composable'

export const DEFAULT_ORIENTATION = 'horizontal' as const
export const ORIENTATIONS = ['horizontal', 'vertical'] as const
export type Orientation = typeof ORIENTATIONS[number]

export interface SeparatorProps extends PrimitiveProps {
  /**
   * Either `vertical` or `horizontal`. Defaults to `horizontal`.
   */
  orientation?: Orientation
  /**
   * Whether or not the component is purely decorative. When true, accessibility-related attributes
   * are updated so that that the rendered element is removed from the accessibility tree.
   */
  decorative?: boolean
}

// Split this out for clearer readability of the error message.
function getInvalidOrientationError(value: string, componentName: string) {
  const error = `Invalid prop \`orientation\` of value \`${value}\` supplied to \`${componentName}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${DEFAULT_ORIENTATION}\`.`

  console.error(error)
}

function isValidOrientation(orientation: any): orientation is Orientation {
  return ORIENTATIONS.includes(orientation)
}

</script>

<script setup lang="ts">

defineOptions({
  name: 'OkuSeparator',
})

const props = withDefaults(defineProps<SeparatorProps>(), {
  is: 'div',
  orientation: 'horizontal',
})

const { componentRef, currentElement } = useComponentRef<HTMLButtonElement | null>()

const orientation = computed(() => isValidOrientation(props.orientation)
  ? props.orientation
  : DEFAULT_ORIENTATION)

// `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
const ariaOrientation = computed(() =>
  orientation.value === 'vertical'
    ? orientation.value
    : undefined)

const semanticProps = computed(() => props.decorative
  ? { role: 'none' }
  : { 'aria-orientation': ariaOrientation.value, 'role': 'separator' })

onMounted(() => {
  if (!isValidOrientation(props.orientation))
    getInvalidOrientationError(props.orientation, 'OkuSeparator')
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
    :data-orientation="props.orientation"
    v-bind="{
      ...semanticProps,
      ...$attrs,
    }"
  >
    <slot />
  </Primitive>
</template>
