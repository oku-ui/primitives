<script setup lang="ts">
import { h, toRefs, useSlots } from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
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

const forwardedRef = useForwardRef()
const { isPresent, ref: presenceRef } = usePresence(present)
const composedRefs = useComposedRefs(presenceRef, forwardedRef)

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
      ref: composedRefs,
    })
    : null
}
</script>

<template>
  <Comp />
</template>
