import { computed, type Ref } from 'vue'
import { useCollapsibleRoot, type UseCollapsibleRootReturns } from '../collapsible/CollapsibleRoot.ts'
import { createContext, useId } from '../hooks/index.ts'
import { type Data, mergeAttrs, mergeProps } from '../shared/index.ts'
import { useAccordionContext } from './AccordionRoot.ts'

export interface AccordionItemProps {
  /**
   * Whether or not an accordion item is disabled from user interaction.
   *
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * A string value for the accordion item. All items within an accordion should use a unique value.
   */
  value: string
}

export interface AccordionItemContext {
  open: Ref<boolean>
  disabled: Ref<boolean | undefined>
  triggerId: string
}

export const [provideAccordionItemContext, useAccordionItemContext] = createContext<AccordionItemContext>('AccordionItem')

export interface UseAccordionItemProps {
  value: () => string
  disabled?: () => boolean
}

export interface UseAccordionItemReturns extends UseCollapsibleRootReturns {
  'data-orientation': 'horizontal' | 'vertical'
  [key: string]: any
}

export function useAccordionItem(props: UseAccordionItemProps): (extraAttrs?: Data) => UseAccordionItemReturns {
  const context = useAccordionContext('AccordionItem')
  const open = computed(() => {
    const value = props.value()
    return (value && context.value.value.includes(value)) || false
  })
  const disabled = computed(() => context.disabled?.() || props.disabled?.())

  function onUpdateOpen(open: boolean) {
    if (open)
      context.onItemOpen(props.value())
    else
      context.onItemClose(props.value())
  }

  provideAccordionItemContext({
    open,
    disabled,
    triggerId: useId(),
  })

  const collapsibleRoot = useCollapsibleRoot({
    open() {
      return open.value
    },
    onUpdateOpen,
    disabled() {
      return disabled.value
    },
  })

  return (extraAttrs?: Data): UseAccordionItemReturns => {
    const attrs = {
      'data-orientation': context.orientation,
    } as const

    if (extraAttrs)
      mergeProps(attrs, collapsibleRoot(), extraAttrs)
    else
      mergeAttrs(attrs, collapsibleRoot())

    return attrs as UseAccordionItemReturns
  }
}
