<script setup lang="ts">
import type { Component, SetupContext, VNode } from 'vue'
import { Fragment, cloneVNode, createElementBlock, createVNode, mergeProps, ref, useAttrs, useSlots } from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { isComment, isElement, isElementRoot, isValidElement } from '@oku-ui/utils'
import { isSlottable } from './utils'

defineOptions({
  name: 'OkuSlot',
})

const slots = useSlots()

const forwarded = useForwardRef()
const element = ref()
const composedRefs = useComposedRefs(forwarded, element)

function renderSlotFragments(children: VNode[]): VNode[] {
  if (!children.length)
    return []

  return children.flatMap((child) => {
    if (child.type === Fragment)
      return renderSlotFragments(child.children as VNode[])

    return [child]
  })
}
const attrs = useAttrs()

function Comp(props: any, context: SetupContext<any>,
) {
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
      const n = createElementBlock(first.type, {
        ...mergeProps(attrs, first.props, {
          ref: forwarded,
        }),
      })

      return createVNode(n, null, newChildren)
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

    if (isValidElement(first) && isElementRoot(first)) {
      if (!first.props)
        first.props = {}

      const clone = cloneVNode(first, {
        ref: element,
        ...mergeProps(attrs, props, context.attrs),
      }, true)

      return clone
    }
    else {
      return first
    }
  }
}
</script>

<template>
  <Comp
    :ref="(el: Element) => {
      if (isElement(el) && !isComment(el)){
        composedRefs(el)
      }
    }"
  >
    <slot />
  </Comp>
</template>
