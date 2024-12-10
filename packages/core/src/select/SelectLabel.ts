import { mergePrimitiveAttrs, type RadixPrimitiveReturns } from '../shared'
import { useSelectGroupContext } from './SelectGroup'

export function useSelectLabel(): RadixPrimitiveReturns {
  const groupContext = useSelectGroupContext('SelectLabel')

  return {
    attrs(extraAttrs) {
      const attrs = {
        id: groupContext.id,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
