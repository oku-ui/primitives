import type { MutableRefObject } from '@oku-ui/hooks'
import type { Measurable } from './PopperRoot.ts'

export interface PopperAnchorProps {
  virtualRef?: MutableRefObject<Measurable>
}

export type PopperAnchorElement = HTMLDivElement
