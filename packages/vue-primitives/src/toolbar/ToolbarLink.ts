import type { PrimitiveProps } from '../primitive/index.ts'

export interface ToolbarLinkProps {
  as?: PrimitiveProps['as']
}

// eslint-disable-next-line ts/consistent-type-definitions
export type ToolbarLinkEmits = {
  keydown: [event: KeyboardEvent]
}
