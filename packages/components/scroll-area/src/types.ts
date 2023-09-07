import { ScopePropObject } from '@oku-ui/provide'
import type { Scope } from '@oku-ui/provide'

export type ScopedScrollArea<P> = P & { scopeOkuScrollArea?: Scope }

export const scopedScrollAreaProps = {
  scopeOkuScrollArea: {
    ...ScopePropObject,
  },
}
