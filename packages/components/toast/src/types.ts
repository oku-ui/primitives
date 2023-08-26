import { ScopePropObject } from '@oku-ui/provide'
import type { Scope } from '@oku-ui/provide'

export type ScopedPropsInterface<P> = P & { scopeOkuToast?: Scope }
export const scopedProps = {
  scopeOkuToast: {
    ...ScopePropObject,
  },
}
