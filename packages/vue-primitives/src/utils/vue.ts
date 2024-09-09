import { PatchFlags } from '@vue/shared'
import { Comment, Fragment, type VNode } from 'vue'

export function composeEventHandlers<E extends Event>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {},
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event)

    if (checkForDefaultPrevented === false || !((event as unknown) as Event).defaultPrevented)
      ourEventHandler?.(event)
  }
}

// TODO: wip
export function getRawChildren(children: VNode[]): VNode[] {
  let ret: VNode[] = []
  let keyedFragmentCount = 0
  for (let i = 0; i < children.length; i++) {
    const child = children[i]!
    // #5360 inherit parent key in case of <template v-for>
    // const key
    //   = parentKey == null
    //     ? child.key
    //     : String(parentKey) + String(child.key != null ? child.key : i)
    // handle fragment children case, e.g. v-for
    if (child.type === Fragment) {
      if (child.patchFlag & PatchFlags.KEYED_FRAGMENT)
        keyedFragmentCount++
      ret = ret.concat(
        getRawChildren(child.children as VNode[]),
      )
    }
    // comment placeholders should be skipped, e.g. v-if
    else if (child.type !== Comment) {
      ret.push(child)
    }
  }
  // #1126 if a transition children list contains multiple sub fragments, these
  // fragments will be merged into a flat children array. Since each v-for
  // fragment may contain different static bindings inside, we need to de-op
  // these children to force full diffs to ensure correct behavior.
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i]!.patchFlag = PatchFlags.BAIL
    }
  }
  return ret
}
