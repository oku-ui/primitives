<script setup lang="ts" generic="T extends AccordionType">
import { computed, shallowRef, toRef, useAttrs } from 'vue'
import { useDirection } from '../direction/Direction.ts'
import { useControllableState } from '../hooks/useControllableState.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/composeEventHandlers.ts'
import { arrayify } from '../utils/array.ts'
import { useId } from '../hooks/useId.ts'
import { ACCORDION_KEYS, type AccordionEmits, type AccordionProps, type AccordionType, Collection, provideAccordionContext, useCollection } from './Accordion.ts'

defineOptions({
  name: 'Accordion',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AccordionProps<T>>(), {
  disabled: false,
  orientation: 'vertical',
  collapsible: false,
})
const emit = defineEmits<AccordionEmits<T>>()
const attrs = useAttrs()

const elRef = shallowRef<HTMLElement>()

const direction = useDirection(() => props.dir)

const value = useControllableState(props, emit, 'value', props.defaultValue)
const TYPE_SINGLE = 'single' as const satisfies AccordionType
type SingleValue = NonNullable<AccordionProps<'single'>['value']>
type MultipleValue = NonNullable<AccordionProps<'multiple'>['value']>
type Value = T extends 'single' ? SingleValue : MultipleValue

const collectionContext = Collection.provideCollectionContext(elRef)
const getItems = useCollection(collectionContext)
const handleKeydown = composeEventHandlers<KeyboardEvent>(() => {
  ;(attrs.onKeydown as Function | undefined)?.()
}, (event) => {
  if (!ACCORDION_KEYS.includes(event.key))
    return
  const target = event.target as HTMLElement
  const triggerCollection = getItems().filter(item => !item.ref?.disabled)
  const triggerIndex = triggerCollection.findIndex(item => item.ref === target)
  const triggerCount = triggerCollection.length

  if (triggerIndex === -1)
    return

  // Prevents page scroll while user is navigating
  event.preventDefault()

  let nextIndex = triggerIndex
  const homeIndex = 0
  const endIndex = triggerCount - 1

  const moveNext = () => {
    nextIndex = triggerIndex + 1
    if (nextIndex > endIndex) {
      nextIndex = homeIndex
    }
  }

  const movePrev = () => {
    nextIndex = triggerIndex - 1
    if (nextIndex < homeIndex) {
      nextIndex = endIndex
    }
  }

  switch (event.key) {
    case 'Home':
      nextIndex = homeIndex
      break
    case 'End':
      nextIndex = endIndex
      break
    case 'ArrowRight':
      if (props.orientation === 'horizontal') {
        if (direction.value === 'ltr') {
          moveNext()
        }
        else {
          movePrev()
        }
      }
      break
    case 'ArrowDown':
      if (props.orientation === 'vertical') {
        moveNext()
      }
      break
    case 'ArrowLeft':
      if (props.orientation === 'horizontal') {
        if (direction.value === 'ltr') {
          movePrev()
        }
        else {
          moveNext()
        }
      }
      break
    case 'ArrowUp':
      if (props.orientation === 'vertical') {
        movePrev()
      }
      break
  }

  const clampedIndex = nextIndex % triggerCount
  triggerCollection[clampedIndex]?.ref?.focus()
})

provideAccordionContext({
  id: useId(),
  collapsible: props.collapsible,

  disabled: toRef(props, 'disabled'),
  direction,
  orientation: props.orientation,
  value: computed(() => {
    if (props.type === TYPE_SINGLE)
      return typeof value.value === 'string' ? [value.value] : []
    return Array.isArray(value.value) ? value.value : []
  }),
  onItemOpen(itemValue) {
    if (props.type === TYPE_SINGLE) {
      value.value = itemValue as Value
    }
    else {
      value.value = [...arrayify<SingleValue>(value.value || []), itemValue] as Value
    }
  },
  onItemClose(itemValue) {
    if (props.type === TYPE_SINGLE) {
      if (props.collapsible) {
        value.value = '' as Value
      }
    }
    else {
      value.value = arrayify<SingleValue>(value.value || []).filter(value => value !== itemValue) as Value
    }
  },
})
</script>

<template>
  <Primitive
    :ref="(el: any) => {
      const node = (el?.$el ?? el)
      elRef = node?.hasAttribute ? node : undefined
    }"
    :as="as"
    :as-child="asChild"
    v-bind="{
      ...attrs,
      onKeydown(e: KeyboardEvent) {
        if (!props.disabled)
          handleKeydown(e)
      },
    }"
    :data-orientation="props.orientation"
  >
    <slot />
  </Primitive>
</template>
