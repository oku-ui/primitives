import { createContext } from '../hooks/index.ts'
import type { DismissableLayerEmits } from '../dismissable-layer/index.ts'

export interface TooltipContentImplProps {
  /**
   * A more descriptive label for accessibility purpose
   */
  ariaLabel?: string
}

// eslint-disable-next-line ts/consistent-type-definitions
export type TooltipContentImplEmits = {
  /** Event handler called when focus moves to the destructive action after opening. It can be prevented by calling `event.preventDefault` */
  escapeKeydown: DismissableLayerEmits['escapeKeydown']
  /** Event handler called when a pointer event occurs outside the bounds of the component. It can be prevented by calling `event.preventDefault`. */
  pointerdownOutside: DismissableLayerEmits['pointerdownOutside']
}

export interface TooltipContentContext {
  id: string
  label: () => string | undefined
}

export const [provideTooltipContentContext, useTooltipContentContext] = createContext<TooltipContentContext>('TooltipContent')
