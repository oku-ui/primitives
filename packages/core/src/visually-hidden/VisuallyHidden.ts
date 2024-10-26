import type { CSSProperties } from 'vue'
import type { PrimitiveProps } from '../primitive/index.ts'

export interface VisuallyHiddenProps {
  as?: PrimitiveProps['as']
}

export const VISUALLY_HIDDEN_STYLE: CSSProperties = {
  position: 'absolute',
  border: '0',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  wordWrap: 'normal',
}
