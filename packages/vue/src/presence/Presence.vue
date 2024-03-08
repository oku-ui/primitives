<script setup lang="ts">
import { defineOptions, h, shallowRef, toRef } from 'vue'
import { unrefElement } from '@oku-ui/use-composable'
import { usePresence } from './usePresence.ts'
import type { PresenceProps } from './Presence.ts'
import { PRESENCE_NAME } from './Presence.ts'

defineOptions({
  name: PRESENCE_NAME,
})

const props = withDefaults(defineProps<PresenceProps>(), {
  present: false,
})

const slots = defineSlots<{
  default: (props: { isPresent: boolean }) => any
}>()

const present = toRef(props, 'present')

const nodeElement = shallowRef<HTMLElement | undefined>()
const { isPresent } = usePresence(present, nodeElement)

function Child() {
  const children = slots.default?.({ isPresent: isPresent.value })

  if (children && children?.length > 1)
    console.error(`OkuPresence can only contain a single child, but found ${children.length} children. Please use a single wrapper element.`)

  const [child] = children ?? []

  return isPresent.value
    ? h(child, {
      ref: (element: any) => {
        const el = unrefElement(element as HTMLElement)

        if (typeof el?.hasAttribute === 'undefined')
          return el

        nodeElement.value = el

        return el
      },
    })
    : null
}
</script>

<template>
  <Child />
</template>
