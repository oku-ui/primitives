import { createContext, useId } from '../hooks'
import { mergePrimitiveAttrs, type RadixPrimitiveReturns } from '../shared'

export interface SelectGroupContextValue {
  id: string
}

export const [provideSelectGroupContext, useSelectGroupContext] = createContext<SelectGroupContextValue>('SelectGroup')

export function useSelectGroupElement(): RadixPrimitiveReturns {
  const groupId = useId()

  provideSelectGroupContext({
    id: groupId,
  })

  return {
    attrs(extraAttrs) {
      const attrs = {
        'role': 'group',
        'aria-labelledby': groupId,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
