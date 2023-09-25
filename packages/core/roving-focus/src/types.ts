import { type Scope, ScopePropObject } from '@oku-ui/provide'

export type ScopedPropsInterface<P> = P & { scopeOkuRovingFocusGroup?: Scope }
export const scopedProps = {
  scopeOkuRovingFocusGroup: {
    ...ScopePropObject,
  },
}
