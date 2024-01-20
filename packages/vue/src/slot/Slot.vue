<script setup lang="ts">
import type { Component, VNode } from 'vue'
import { Fragment, cloneVNode, createElementBlock, createVNode, defineExpose, defineOptions, mergeProps, useSlots } from 'vue'
import { useComponentRef } from '@oku-ui/use-composable'
import { isValidElement } from '@oku-ui/utils'
import { isSlottable } from './utils'

defineOptions({
  name: 'OkuSlot',
})

const slots = useSlots()

const { componentRef, currentElement } = useComponentRef<HTMLDivElement | null>()

defineExpose({
  $el: currentElement,
})

function renderSlotFragments(children: VNode[]): VNode[] {
  if (!children.length)
    return []

  return children.flatMap((child) => {
    if (child.type === Fragment)
      return renderSlotFragments(child.children as VNode[])

    return [child]
  })
}

function Comp(props: any) {
  const defaultSlot = (slots.default?.() || [])
  const slottable = defaultSlot?.find(isSlottable)

  if (slottable) {
    let newElement = (slottable.children?.default?.() ?? []) as VNode[]
    newElement = Array.isArray(newElement) ? newElement : [newElement]
    const [first] = newElement as VNode[]
    const newChildren = defaultSlot
      .filter(({ children }) => children)
      .map((child) => {
        if (child === slottable) {
          if (newElement.length > 1)
            console.error(`OkuSlot can only contain a single child, but found ${newElement.length} children. Please use a single wrapper element.`)

          return newElement.length === 1
            ? (newElement[0].children) as Component
            : null
        }
        else {
          return child
        }
      })

    if (isValidElement(first)) {
      const _props = mergeProps(props, first.props ?? {})

      const n = createElementBlock(first.type)

      return createVNode(n, _props, newChildren)
    }
    else {
      return null
    }
  }
  else {
    const children = renderSlotFragments(defaultSlot)
    if (children.length > 1)
      throw new Error('OkuSlot can only contain a single child')

    const first = Array.isArray(children) ? children[0] : children
    const _props = mergeProps(props, first.props ?? {})

    if (isValidElement(first)) {
      const clone = cloneVNode(first, _props, false)
      return clone
    }
    else {
      return cloneVNode(first, _props, false)
    }
  }
}
</script>

<template>
  <Comp
    ref="componentRef"
  >
    <slot />
  </Comp>
</template>
