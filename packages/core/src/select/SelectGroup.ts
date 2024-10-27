import { createContext } from '@oku-ui/hooks'
import { mergePrimitiveAttrs, type RadixPrimitiveReturns } from '@oku-ui/shared'
import { useId } from 'vue'

export interface SelectGroupContext {
  id: string
}

export const [provideSelectGroupContext, useSelectGroupContext] = createContext<SelectGroupContext>('SelectGroup')

export function useSelectGroup(): RadixPrimitiveReturns {
  const groupId = useId()

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
