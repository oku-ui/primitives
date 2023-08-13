import { type Scope, ScopePropObject } from '@oku-ui/provide'

export type ScopedPropsInterface<P> = P & { scopeRovingFocusGroup?: Scope }
export const scopedProps = {
  scopeRovingFocusGroup: {
    ...ScopePropObject,
  },
}
