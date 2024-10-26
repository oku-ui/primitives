import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { computed, type Ref } from 'vue'
import { useCollapsibleRoot } from '../collapsible/index.ts'
import { createContext, useId } from '../hooks/index.ts'
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

export const DEFAULT_ACCORDION_ITEM_PROPS = {
  disabled: undefined,
} satisfies PrimitiveDefaultProps<AccordionItemProps>

export interface AccordionItemContext {
  open: Ref<boolean>
  disabled: Ref<boolean | undefined>
  triggerId: string
}

export const [provideAccordionItemContext, useAccordionItemContext] = createContext<AccordionItemContext>('AccordionItem')

export interface UseAccordionItemProps {
  value: () => string
  disabled?: () => boolean | undefined
}

export function useAccordionItem(props: UseAccordionItemProps): RadixPrimitiveReturns {
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

  return {
    attrs(extraAttrs = []) {
      const collapsibleRootAttrs = {
        'data-orientation': context.orientation,
      }

      return collapsibleRoot.attrs([collapsibleRootAttrs, ...extraAttrs])
    },
  }
}
