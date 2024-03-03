<script setup lang="ts">
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { accordionImplProvider } from './AccordionImpl.js'
import type { AccordionImplEmits, AccordionImplProps } from './AccordionImpl.js'
import { computed, ref, toRef } from 'vue'
import { useDirection } from '@oku-ui/direction'
import { CollectionSlot, useCollection } from './AccordionCollections.js'
import { composeEventHandlers } from '@oku-ui/utils'
import { ACCORDION_IMPL_NAME, ACCORDION_KEYS } from './constants.js'
import { Primitive } from '@oku-ui/primitive'

defineOptions({
  name: ACCORDION_IMPL_NAME,
  inheritAttrs: false,
})

const props = defineProps<AccordionImplProps>()
const emit = defineEmits<AccordionImplEmits>()

const accordionRef = ref<HTMLDivElement>()

const forwardRef = useForwardRef()
const composedRefs = useComposedRefs(accordionRef, forwardRef)

const getItems = useCollection(props.scopeOkuAccordion)
const direction = useDirection(toRef(props, 'dir'))
const isDirectionLTR = computed(() => direction.value === 'ltr')

const handleKeyDown = composeEventHandlers<KeyboardEvent>(
  event => emit('keydown', event),
  (event) => {
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
      if (nextIndex > endIndex)
        nextIndex = homeIndex
    }

    const movePrev = () => {
      nextIndex = triggerIndex - 1
      if (nextIndex < homeIndex)
        nextIndex = endIndex
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
          if (isDirectionLTR.value)
            moveNext()
          else
            movePrev()
        }
        break
      case 'ArrowDown':
        if (props.orientation === 'vertical')
          moveNext()

        break
      case 'ArrowLeft':
        if (props.orientation === 'horizontal') {
          if (isDirectionLTR.value)
            movePrev()

          else
            moveNext()
        }
        break
      case 'ArrowUp':
        if (props.orientation === 'vertical')
          movePrev()

        break
    }

    const clampedIndex = nextIndex % triggerCount
    triggerCollection[clampedIndex].ref?.focus()
  },
)

accordionImplProvider({
  scope: props.scopeOkuAccordion,
  disabled: toRef(props, 'disabled'),
  direction: toRef(props, 'dir'),
  orientation: toRef(props, 'orientation'),
})
</script>

<template>
  <CollectionSlot :scope="scopeOkuAccordion">
    <Primitive
      v-bind="$attrs"
      :is="is"
      :ref="composedRefs"
      :as-child="asChild"
      :data-orientation="orientation"
      @keydown="disabled ? undefined : handleKeyDown"
    >
      <slot />
    </Primitive>
  </CollectionSlot>
</template>
