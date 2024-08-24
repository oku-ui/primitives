import type { MutableRefObject } from '../hooks/index.ts'
import type { PrimitiveProps } from '../primitive/index.ts'
import type { Measurable } from './Popper.ts'

export interface PopperAnchorProps extends PrimitiveProps {
  virtualRef?: MutableRefObject<Measurable>
}

export type PopperAnchorElement = HTMLDivElement
