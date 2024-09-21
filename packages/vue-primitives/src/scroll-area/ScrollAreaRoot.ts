import type { Ref } from 'vue'
import type { Direction } from '../direction/index.ts'
import { createContext } from '@oku-ui/hooks'

type ScrollAreaType = 'auto' | 'always' | 'scroll' | 'hover'

export interface ScrollAreaRootProps {
  type?: ScrollAreaType
  dir?: Direction
  scrollHideDelay?: number
}

export interface ScrollAreaContext {
  type: () => ScrollAreaType
  dir: Ref<Direction>
  scrollHideDelay: number
  scrollArea: Ref<HTMLElement | undefined>
  viewport: Ref<HTMLElement | undefined>
  content: Ref<HTMLDivElement | undefined>
  scrollbarX: Ref<HTMLElement | undefined>
  scrollbarXEnabled: Ref<boolean>
  onScrollbarXEnabledChange: (rendered: boolean) => void
  scrollbarY: Ref<HTMLElement | undefined>
  scrollbarYEnabled: Ref<boolean>
  onScrollbarYEnabledChange: (rendered: boolean) => void
  onCornerWidthChange: (width: number) => void
  onCornerHeightChange: (height: number) => void
}

export const [provideScrollAreaContext, useScrollAreaContext] = createContext<ScrollAreaContext>('ScrollArea')
