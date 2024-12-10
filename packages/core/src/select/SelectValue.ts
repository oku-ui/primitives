import type { PrimitiveProps } from '../primitive'
import { mergePrimitiveAttrs, type PrimitiveDefaultProps, type PrimitiveElAttrs, type RadixPrimitiveGetAttrs, type RadixPrimitiveReturns } from '../shared'
import { computed, type Ref } from 'vue'
import { useSelectContext } from './SelectRoot'
import { shouldShowPlaceholder } from './utils'

export interface SelectValueProps {
  as?: PrimitiveProps['as']
}

export const DEFAULT_SELECT_VALUE_PROPS = {
  as: 'span',
} satisfies PrimitiveDefaultProps<SelectValueProps>

export function useSelectValue(): RadixPrimitiveReturns<{
  showPlaceholder: Ref<boolean>
  attrs: RadixPrimitiveGetAttrs
}> {
  const context = useSelectContext('SelectValue')
  // const { onValueNodeHasChildrenChange } = context
  // const hasChildren = children !== undefined

  function setElRef(v: HTMLElement | undefined) {
    context.valueNode.value = v
  }

  // TODO: wip
  // useLayoutEffect(() => {
  //   onValueNodeHasChildrenChange(hasChildren)
  // }, [onValueNodeHasChildrenChange, hasChildren])

  const showPlaceholder = computed(() => shouldShowPlaceholder(context.value.value))

  return {
    showPlaceholder,
    attrs(extraAttrs) {
      const attrs: PrimitiveElAttrs = {
        elRef: setElRef,
        style: {
          pointerEvents: 'none',
        },
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
