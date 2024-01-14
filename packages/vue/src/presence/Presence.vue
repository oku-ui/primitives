<script setup lang="ts">
import { defineOptions, h, toRefs, useSlots } from 'vue'
import { useComponentRef } from '@oku-ui/use-composable'
import { usePresence } from './usePresence'

export interface PresenceProps {
  present: boolean
}

defineOptions({
  name: 'OkuPresence',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PresenceProps>(), {
  present: false,
})

const { present } = toRefs(props)

const { componentRef, currentElement } = useComponentRef<HTMLElement | undefined>()
const { isPresent } = usePresence(present, currentElement)

const slots = useSlots()

function Comp() {
  const slot = slots.default?.({
    isPresent,
  })

  if (slot && slot?.length > 1)
    console.error(`OkuPresence can only contain a single child, but found ${slot.length} children. Please use a single wrapper element.`)

  const [child] = slot ?? []

  return isPresent.value
    ? h(child, {
      ref: componentRef,
    })
    : null
}
</script>

<template>
  <Comp />
</template>
