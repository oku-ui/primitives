import { Fragment, isVNode } from 'vue'
import type { Component, VNode } from 'vue'

// @credit: headlessui
export function isValidElement(input: VNode): boolean {
  if (input == null)
    return false // No children
  if (typeof input.type === 'string')
    return true // 'div', 'span', ...
  if (typeof input.type === 'object')
    return true // Other components
  if (typeof input.type === 'function')
    return true // Built-ins like Transition

  return false // Comments, strings, ...
}

export function isSlottable(child: VNode): child is VNode {
  return (
    isVNode(child)
    && ((child.type as Component).name === 'OkuSlottable')
  )
}

export function isEmptyElement(c: any) {
  return (
    c
    && (c.type === Comment
    || (c.type === Fragment && c.children.length === 0)
    || (c.type === Text && c.children.trim() === ''))
  )
}

export function isEmptySlot(c: any) {
  return !c || c().every(isEmptyElement)
}

export function isStringElement(c: any) {
  return c && c.type === Text
}

export function filterEmpty(children = []) {
  const res: any = []
  children.forEach((child: any) => {
    if (Array.isArray(child))
      res.push(...child)

    else if (child.type === Fragment)
      res.push(...child.children)

    else
      res.push(child)
  })
  return res.filter((c: any) => !isEmptyElement(c))
}
