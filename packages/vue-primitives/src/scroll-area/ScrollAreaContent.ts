import { mergeHooksAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'

export function useScrollAreaContent(): RadixPrimitiveReturns {
  const context = useScrollAreaContext('ScrollAreaContent')

  function setTemplateEl(templateEl: HTMLElement | undefined) {
    context.content.value = templateEl
  }

  return {
    attrs(extraAttrs) {
      const attrs = {
        ref: setTemplateEl,
        style: 'min-width: 100%; display: table',
      }

      if (extraAttrs)
        mergeHooksAttrs(attrs, extraAttrs)

      return attrs
    },
  }
}
