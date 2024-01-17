<script lang="ts">
import type { AriaAttributes, Ref } from 'vue'
import { computed, ref, toRefs } from 'vue'
import type { PrimitiveProps } from '@oku-ui/primitive'
import { useComponentRef, useVModel } from '@oku-ui/use-composable'
import { clamp, composeEventHandlers } from '@oku-ui/utils'
import { ARROW_KEYS, CollectionProvider, CollectionSlot, PAGE_KEYS, getClosestValueIndex, getDecimalCount, getNextSortedValues, hasMinStepsBetweenValues, roundValue, sliderProvider } from './utils'
import type { Direction } from './utils'
import type { SliderThumbElement } from './SliderThumb.vue'
import type { Scope } from '@oku-ui/provide'

export interface SliderProps extends PrimitiveProps {
  scopeOkuSlider?: Scope
  name?: string
  disabled?: boolean
  orientation?: AriaAttributes['aria-orientation']
  dir?: Direction
  min?: number
  max?: number
  step?: number
  minStepsBetweenThumbs?: number
  value?: number[]
  defaultValue?: number[]
  inverted?: boolean
}

export type SliderEmits = {
  'valueChange': [value: number[]]
  'valueCommit': [value: number[]]
  'slideStart': [event: number]
  'slideMove': [event: number]
  'slideEnd': []
  'homeKeyDown': [event: KeyboardEvent]
  'endKeyDown': [event: KeyboardEvent]
  'stepKeyDown': [event: KeyboardEvent]
  'keydown': [event: KeyboardEvent]
  'pointerdown': [event: PointerEvent]
  'pointermove': [event: PointerEvent]
  'pointerup': [event: PointerEvent]
}

</script>

<script setup lang="ts">
import OkuSliderHorizontal from './SliderHorizontal.vue'
import OkuSliderVertical from './SliderVertical.vue'
import OkuSliderBubbleInput from './SliderBubbleInput.vue'

defineOptions({
  name: 'OkuSlider',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SliderProps>(), {
  disabled: false,
  orientation: 'horizontal',
  dir: 'ltr',
  min: 0,
  max: 100,
  step: 1,
  minStepsBetweenThumbs: 0,
  value: undefined,
  defaultValue: undefined,
  inverted: false,
})

const emits = defineEmits<SliderEmits>()
const propsRef = toRefs(props)
const { componentRef, currentElement } = useComponentRef<HTMLSpanElement | null>()

// new Set()
const initialThumbSet = new Set<SliderThumbElement>()
const thumbRefs = ref(initialThumbSet)

const valueIndexToChangeRef = ref<number>(0)
const isHorizontal = props.orientation === 'horizontal'

const values = useVModel(props, 'value', emits, {
  defaultValue: props.defaultValue,
  passive: (props.value === undefined) as false,
  shouldEmit(v: any) {
    emits('valueChange', v)
    return true
  },
}) as Ref<number[]>

// We set this to true by default so that events bubble to forms without JS (SSR)
const isFormControl = computed(() => {
  return false
})

const valuesBeforeSlideStartRef = ref<number[]>(values.value as number[])

function handleSlideStart(value: number) {
  const closestIndex = getClosestValueIndex(values.value || [], value)
  updateValues(value, closestIndex)
}

function handleSlideMove(value: number) {
  updateValues(value, valueIndexToChangeRef.value)
}

function handleSlideEnd() {
  const prevValue = valuesBeforeSlideStartRef.value[valueIndexToChangeRef.value]
  const nextValue = values.value?.[valueIndexToChangeRef.value]
  const hasChanged = nextValue !== prevValue
  if (hasChanged)
    emits('valueCommit', values.value || [])
}

function updateValues(value: number, atIndex: number, { commit } = { commit: false }) {
  const decimalCount = getDecimalCount(props.step)
  const snapToStep = roundValue(Math.round((value - props.min) / props.step) * props.step + props.min, decimalCount)
  const nextValue = clamp(snapToStep, [props.min, props.max])

  const prevValues = values.value
  const newData = () => {
    const nextValues = getNextSortedValues(prevValues, nextValue, atIndex)
    if (hasMinStepsBetweenValues(nextValues, props.minStepsBetweenThumbs * props.step)) {
      valueIndexToChangeRef.value = nextValues.indexOf(nextValue)
      const hasChanged = String(nextValues) !== String(prevValues)
      if (hasChanged && commit)
        emits('valueCommit', nextValues)
      return hasChanged ? nextValues : prevValues
    }
    else {
      return prevValues
    }
  }
  values.value = newData()
}

sliderProvider({
  scope: props.scopeOkuSlider,
  disabled: propsRef.disabled,
  min: propsRef.min,
  max: propsRef.max,
  valueIndexToChangeRef,
  thumbs: thumbRefs,
  values,
  orientation: propsRef.orientation,
})

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <CollectionProvider
    :scope="props.scopeOkuSlider"
  >
    <CollectionSlot
      :scope="props.scopeOkuSlider"
    >
      <component
        :is="isHorizontal ? OkuSliderHorizontal : OkuSliderVertical"
        ref="componentRef"
        :as-child="props.asChild"
        :min="props.min"
        :max="props.max"
        :inverted="inverted"
        v-bind="$attrs"
        @pointerdown="composeEventHandlers((event: any) => {
          emits('pointerdown', event)
        }, () => {
          if (!disabled) valuesBeforeSlideStartRef = values;
        })($event)"
        @slide-start="props.disabled ? undefined : handleSlideStart($event)"
        @slide-move="props.disabled ? undefined : handleSlideMove($event)"
        @slide-end="props.disabled ? undefined : handleSlideEnd()"
        @home-key-down="() => !props.disabled && updateValues(min, 0, { commit: true })"
        @end-key-down="() =>
          !props.disabled && updateValues(max, (values?.length || 0) - 1, { commit: true })"
        @step-key-down="({ direction: stepDirection, event }) => {
          if (!props.disabled) {
            const isPageKey = PAGE_KEYS.includes(event.key)
            const isSkipKey = isPageKey || (event.shiftKey && ARROW_KEYS.includes(event.key))
            const multiplier = isSkipKey ? 10 : 1
            const atIndex = valueIndexToChangeRef
            const value = values?.[atIndex]
            const stepInDirection = props.step * multiplier * stepDirection
            updateValues((value || 0) + stepInDirection, atIndex, { commit: true })
          }
        }"
      >
        <slot />
      </component>
    </CollectionSlot>
    <template v-if="isFormControl">
      <OkuSliderBubbleInput
        v-for="(value, index) in values"
        :key="index"
        :value="value"
        :name="props.name ? props.name + ((values || []).length > 1 ? '[]' : '') : undefined"
      />
    </template>
  </CollectionProvider>
</template>
