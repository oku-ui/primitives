import type { Ref } from 'vue'
import { createContext } from '../hooks/index.ts'

export interface TooltipRootProps {
  open?: boolean
  defaultOpen?: boolean
  /**
   * The duration from when the pointer enters the trigger until the tooltip gets opened. This will
   * override the prop with the same name passed to Provider.
   * @defaultValue 700
   */
  delayDuration?: number
  /**
   * When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger.
   * @defaultValue false
   */
  disableHoverableContent?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type TooltipRootEmits = {
  'update:open': [open: boolean]
}

export const TOOLTIP_OPEN = 'tooltip.open'

type TooltipTriggerElement = HTMLButtonElement

export interface TooltipContext {
  contentId: string
  open: Ref<boolean>
  stateAttribute: () => 'closed' | 'delayed-open' | 'instant-open'
  trigger: Ref<TooltipTriggerElement | undefined>
  onTriggerChange: (trigger: TooltipTriggerElement | undefined) => void
  onTriggerEnter: () => void
  onTriggerLeave: () => void
  onOpen: () => void
  onClose: () => void
  disableHoverableContent: boolean
}

export const [provideTooltipContext, useTooltipContext] = createContext<TooltipContext>('Tooltip')
