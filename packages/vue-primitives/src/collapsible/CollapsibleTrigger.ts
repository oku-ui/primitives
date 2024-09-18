import type { PrimitiveProps } from '../primitive/index.ts'
import { composeEventHandlers, type ConvertEmitsToUseEmits } from '../utils/vue.ts'
import { useCollapsibleContext } from './CollapsibleRoot.ts'

export interface CollapsibleTriggerProps {
  as?: PrimitiveProps['as']
}

export type CollapsibleTriggerEmits = {
  click: [event: MouseEvent]
}

export type UseCollapsibleTriggerEmits = ConvertEmitsToUseEmits<CollapsibleTriggerEmits>

export interface UseCollapsibleTriggerReturns {
  'type': 'button'
  'aria-controls': string
  'aria-expanded': boolean
  'data-state': 'open' | 'closed'
  'data-disabled'?: string
  'disabled': boolean | undefined
  'onClick': (event: MouseEvent) => void
}

export function useCollapsibleTrigger(emits: UseCollapsibleTriggerEmits): () => UseCollapsibleTriggerReturns {
  const context = useCollapsibleContext('CollapsibleTrigger')

  const onClick = composeEventHandlers<MouseEvent>((event) => {
    emits.onClick?.(event)
  }, context.onOpenToggle)

  return (): UseCollapsibleTriggerReturns => ({
    'type': 'button',
    'aria-controls': context.contentId,
    'aria-expanded': context.open.value || false,
    'data-state': context.open.value ? 'open' : 'closed',
    'data-disabled': context.disabled() ? '' : undefined,
    'disabled': context.disabled(),
    onClick,
  })
}
