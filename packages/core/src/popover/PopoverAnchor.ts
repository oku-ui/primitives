import type { MutableRefObject } from '../hooks/index.ts'
import type { Measurable, PopperAnchorProps } from '../popper/index.ts'
import type { RadixPrimitiveGetAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import { usePopperContext } from '../popper/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'

export interface PopoverAnchorProps extends PopperAnchorProps {

}

export interface UsePopoverAnchorProps {
  virtualRef?: MutableRefObject<Measurable | undefined>
}

export function usePopoverAnchor(props: UsePopoverAnchorProps = {}): RadixPrimitiveReturns<{
  isShow: boolean
  attrs: RadixPrimitiveGetAttrs
}> {
  const popperContext = usePopperContext('PopperAnchor')

  if (props.virtualRef) {
    popperContext.onAnchorChange(props.virtualRef.value)
  }

  function setElRef(v: HTMLElement | undefined) {
    popperContext.onPostionAnchorChange(v)
  }

  return {
    isShow: !!props.virtualRef,
    attrs(extraAttrs) {
      const attrs = {
        elRef: setElRef,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
