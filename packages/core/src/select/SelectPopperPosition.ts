import type { IAttrsData, PrimitiveElAttrs, RadixPrimitiveGetAttrs, RadixPrimitiveReturns } from '@oku-ui/shared'
import { usePopperContent, type UsePopperContentProps } from '@oku-ui/popper'
import { CONTENT_MARGIN } from './SelectContent'

export type UseSelectPopperPrivateProps = {
  onPlaced?: UsePopperContentProps['onPlaced']
}

export interface SelectPopperPositionProps {

}

export interface UseSelectPopperPosition extends UsePopperContentProps, UseSelectPopperPrivateProps {

}

export function useSelectPopperPosition(props: UseSelectPopperPosition = {}): RadixPrimitiveReturns<{
  wrapperAttrs: () => IAttrsData
  attrs: RadixPrimitiveGetAttrs
}> {
  const {
    align = 'start',
    collisionPadding = CONTENT_MARGIN,
  } = props

  const popperContent = usePopperContent({
    ...props,
    align,
    collisionPadding,
  })

  const attrs: PrimitiveElAttrs = {
    style: {
      // Ensure border-box for floating-ui calculations
      'boxSizing': 'border-box',
      // re-namespace exposed content custom properties
      '--radix-select-content-transform-origin': 'var(--radix-popper-transform-origin)',
      '--radix-select-content-available-width': 'var(--radix-popper-available-width)',
      '--radix-select-content-available-height': 'var(--radix-popper-available-height)',
      '--radix-select-trigger-width': 'var(--radix-popper-anchor-width)',
      '--radix-select-trigger-height': 'var(--radix-popper-anchor-height)',
    },
  }

  return {
    wrapperAttrs: popperContent.wrapperAttrs,
    attrs(extraAttrs = []) {
      return popperContent.attrs([attrs, ...extraAttrs])
    },
  }
}
