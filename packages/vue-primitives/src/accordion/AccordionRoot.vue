<script setup lang="ts" generic="T extends AccordionType">
import { computed } from 'vue'
import { useDirection } from '../direction/Direction.ts'
import { useControllableState, useForwardElement, useId, useRef } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { arrayify, composeEventHandlers } from '../shared/index.ts'
import { ACCORDION_KEYS, type AccordionRootEmits, type AccordionRootProps, type AccordionType, Collection, provideAccordionContext, useCollection } from './AccordionRoot.ts'

type SingleValue = Exclude<AccordionRootProps<'single'>['value'], undefined>
type MultipleValue = Exclude<AccordionRootProps<'multiple'>['value'], undefined>
type Value = T extends 'single' ? SingleValue : MultipleValue

defineOptions({
  name: 'AccordionRoot',
})

const props = withDefaults(defineProps<AccordionRootProps<T>>(), {
  disabled: false,
  orientation: 'vertical',
  collapsible: false,
})
const emit = defineEmits<AccordionRootEmits<T>>()

const elRef = useRef<HTMLElement>()
const forwardElement = useForwardElement(elRef)

const direction = useDirection(() => props.dir)
const defaultValue = props.type === 'single' ? props.defaultValue : props.defaultValue ?? []
const value = useControllableState(props, 'value', v => emit('update:value', v as Value), defaultValue)
const TYPE_SINGLE = 'single' as const satisfies AccordionType

const getItems = useCollection(Collection.provideCollectionContext(elRef))

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  emit('keydown', event)
}, (event) => {
  if (!ACCORDION_KEYS.includes(event.key))
    return
  const target = event.target as HTMLElement
  const triggerCollection = getItems().filter(item => !item.disabled)
  const triggerIndex = triggerCollection.findIndex(item => item === target)
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
  triggerCollection[clampedIndex]?.focus()
})

provideAccordionContext({
  id: useId(),
  collapsible: props.collapsible,

  disabled() {
    return props.disabled
  },
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
    :ref="forwardElement"
    :data-disabled="disabled ? '' : undefined"
    :data-orientation="orientation"
    @keydown="onKeydown"
  >
    <slot />
  </Primitive>
</template>
