import type { Scope } from '@oku-ui/provide'
import { ScopePropObject } from '@oku-ui/provide'

export type ScopeAccordion<T> = T & { scopeOkuAccordion?: Scope }

export const scopeAccordionProps = {
  scopeOkuAccordion: {
    ...ScopePropObject,
  },
}

export function makeTriggerId(baseId: string, value: string) {
  return `${baseId}-trigger-${value}`
}

export function makeContentId(baseId: string, value: string) {
  return `${baseId}-content-${value}`
}
