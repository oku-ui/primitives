import type { Scope } from '@oku-ui/provide'
import { ScopePropObject } from '@oku-ui/provide'

export type ScopeTabs<T> = T & { scopeOkuTabs?: Scope }

export const scopeTabsProps = {
  scopeOkuTabs: {
    ...ScopePropObject,
  },
}

export function makeTriggerId(baseId: string, value: string) {
  return `${baseId}-trigger-${value}`
}

export function makeContentId(baseId: string, value: string) {
  return `${baseId}-content-${value}`
}
