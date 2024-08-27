import type { MutableRefObject } from '../hooks/index.ts'
import type { Measurable } from './PopperRoot.ts'

export interface PopperAnchorProps {
  virtualRef?: MutableRefObject<Measurable>
}

export type PopperAnchorElement = HTMLDivElement
