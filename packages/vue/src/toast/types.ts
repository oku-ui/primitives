import type { Scope } from '@oku-ui/provide'
import { ScopePropObject } from '@oku-ui/provide'

export type ScopedToast<P> = P & { scopeOkuToast?: Scope }

export const scopedToastProps = {
  scopeOkuToast: {
    ...ScopePropObject,
  },
}
