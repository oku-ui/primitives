import { Comment, Fragment, Text } from '@vue/runtime-dom'

export function getNodeName(node: Node | Window): string {
  if (isNode(node))
    return (node.nodeName || '').toLowerCase()

  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document'
}

export function isNode(value: unknown): value is Node {
  return value instanceof Node || value instanceof getWindow(value).Node
}

export function getWindow(node: any): typeof window {
  return node?.ownerDocument?.defaultView || window
}

export function isEmptyElement(c) {
  return (
    c
    && (c.type === Comment
      || (c.type === Fragment && c.children.length === 0)
      || (c.type === Text && c.children.trim() === ''))
  )
}

export function filterEmpty(children = []): any {
  const res = []
  children.forEach((child) => {
    if (Array.isArray(child))
      res.push(...child)
    else if (child?.type === Fragment)
      res.push(...filterEmpty(child.children))
    else
      res.push(child)
  })
  return res.filter(c => !isEmptyElement(c))
}

export function isValidElement(element) {
  if (Array.isArray(element) && element.length === 1)
    element = element[0]

  return element && element.__v_isVNode && typeof element.type !== 'symbol' // remove text node
}
