import type { ComputedRef, Ref } from 'vue'
import { computed } from 'vue'

type PossibleRef<T> = Ref<T> | ComputedRef<T> | undefined

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function')
    (ref as Function)(value)

  else if (ref !== null && ref !== undefined)
    (ref as Ref<T>).value = value
}

/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => refs.forEach(ref => setRef(ref, node))
}

/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */
function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
  return computed(() => composeRefs(...refs))
}

export { composeRefs, useComposedRefs }
