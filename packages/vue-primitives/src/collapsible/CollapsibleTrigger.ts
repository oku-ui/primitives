import type { PrimitiveProps } from '../primitive/index.ts'
import { composeEventHandlers, type ConvertEmitsToUseEmits, type Data, mergeAttrs } from '../shared/index.ts'
import { useCollapsibleContext } from './CollapsibleRoot.ts'

export interface CollapsibleTriggerProps {
  as?: PrimitiveProps['as']
}

export type CollapsibleTriggerEmits = {
  click: [event: MouseEvent]
}

export interface UseCollapsibleTriggerProps extends ConvertEmitsToUseEmits<CollapsibleTriggerEmits> {}

export interface UseCollapsibleTriggerReturns {
  'type': 'button'
  'aria-controls': string
  'aria-expanded': boolean
  'data-state': 'open' | 'closed'
  'data-disabled'?: string
  'disabled': boolean | undefined
  'onClick': (event: MouseEvent) => void
  [key: string]: any
}

export function useCollapsibleTrigger(
  props: UseCollapsibleTriggerProps,
): (extraAttrs?: Data) => UseCollapsibleTriggerReturns {
  const context = useCollapsibleContext('CollapsibleTrigger')

  const onClick = composeEventHandlers<MouseEvent>((event) => {
    props.onClick?.(event)
  }, context.onOpenToggle)

  return (extraAttrs?: Data): UseCollapsibleTriggerReturns => {
    const attrs = {
      'type': 'button',
      'aria-controls': context.contentId,
      'aria-expanded': context.open.value || false,
      'data-state': context.open.value ? 'open' : 'closed',
      'data-disabled': context.disabled() ? '' : undefined,
      'disabled': context.disabled(),
      onClick,
    } as const

    if (extraAttrs)
      mergeAttrs(attrs, extraAttrs)

    return attrs
  }
}
