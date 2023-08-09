// same inspiration and resource https://github.com/chakra-ui/ark/blob/main/packages/vue/src/factory.tsx

import type { VNode } from 'vue'
import { Fragment } from 'vue'

/**
 * Checks whether a given VNode is a render-vialble element.
 */
export function isValidVNodeElement(input: any): boolean {
  return (
    input
        && (typeof input.type === 'string'
            || typeof input.type === 'object'
            || typeof input.type === 'function')
  )
}

/**
 * When you create a component and pass a <slot />, Vue wraps
 * the contents of <slot /> inside a <Fragment /> component and assigns
 * the <slot /> VNode a type of Fragment.
 *
 * So why are we flattening here? Vue renders VNodes from the leaf
 * nodes going up to the root. In other words, when executing the render function
 * of each component, it executes the child render functions first before the parents.
 *
 * This means that at any components render function execution context, all it's children
 * VNodes should have already been rendered -- and that includes any slots! :D
 *
 * In the cases where we pass in a component with slots to the `asChild` component,
 * we shall need to flatten those slot fragment VNodes so as to extract all it's children VNodes
 * to correctly apply the props and event listeners from the with as child components.
 *
 * We do this recursively to ensure that all first child slots that contain fragments in their descendants are rendered into VNodes before passing events.
 * to the first actual element VNode.
 */
export function renderSlotFragments(children: VNode[]): VNode[] {
  return children.flatMap((child) => {
    if (child.type === Fragment)
      return renderSlotFragments(child.children as VNode[])

    return [child]
  })
}

export const PrimitiveProps = {
  asChild: Boolean,
}
