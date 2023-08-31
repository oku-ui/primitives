import { ScopePropObject } from '@oku-ui/provide'
import type { Scope } from '@oku-ui/provide'

export type ScopedPropsInterface<P> = P & { scopeOkuScrollArea?: Scope }
export const scopedProps = {
  scopeOkuScrollArea: {
    ...ScopePropObject,
  },
}
