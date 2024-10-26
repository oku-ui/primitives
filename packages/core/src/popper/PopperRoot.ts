import type { VirtualElement } from '@floating-ui/utils'
import { isElement } from '@floating-ui/utils/dom'
import { type Ref, shallowRef } from 'vue'
import { createContext } from '../hooks/index.ts'

export type Measurable = HTMLElement | VirtualElement

export interface PopperContext {
  content: Ref<HTMLElement | undefined>
  anchor: Ref<Measurable | undefined>
  onAnchorChange: (newAnchor: Measurable | undefined) => void
  onPostionAnchorChange: (newAnchor: Measurable | undefined) => void
}

export const [providePopperContext, usePopperContext] = createContext<PopperContext>('Popper')

export interface UsePooperRootProps {
  anchor?: Ref<Measurable | undefined>
  content?: Ref<HTMLElement | undefined>
}

export function usePooperRoot(props?: UsePooperRootProps) {
  const content = props?.content ?? shallowRef<HTMLElement>()
  const anchor = props?.anchor ?? shallowRef<Measurable>()
  let anchorRef: Measurable | undefined

  providePopperContext({
    content,
    anchor,
    onAnchorChange(node) {
      if (props?.anchor != null)
        return
      // Backwards-compatibility for passing a virtual element to `reference`
      // after it has set the DOM reference.
      if (
        isElement(anchorRef) || anchorRef == null
        // Don't allow setpositionReference.valueting virtual elements using the old technique back to
        // `null` to support `positionReference` + an unstable `reference`
        // callback ref.
        || (node != null && !isElement(node))
      ) {
        anchor.value = node
        anchorRef = node
      }
    },
    onPostionAnchorChange(node) {
      if (props?.anchor != null)
        return

      const computedPositionReference = isElement(node)
        ? {
            getBoundingClientRect: () => node.getBoundingClientRect(),
            contextElement: node,
          }
        : node
      // Store the positionReference in state if the DOM reference is specified externally via the
      // `elements.reference` option. This ensures that it won't be overridden on future renders.
      // positionReference.value = computedPositionReference
      anchor.value = computedPositionReference
      anchorRef = computedPositionReference
    },
  })
}
