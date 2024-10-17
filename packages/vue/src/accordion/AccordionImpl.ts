import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import type { RovingFocusGroupProps } from '@oku-ui/roving-focus'
import type { Ref } from 'vue'
import { createAccordionProvider } from './Accordion'
import { ACCORDION_NAME } from './constants'

// Props

export interface AccordionImplProps extends PrimitiveProps {
  /**
   * Whether or not an accordion is disabled from user interaction.
   *
   * @default false
   */
  disabled?: boolean

  /**
   * The layout in which the Accordion operates.
   *
   * @default vertical
   */
  orientation?: RovingFocusGroupProps['orientation']

  /**
   * The language read direction.
   */
  dir?: RovingFocusGroupProps['dir']

  scopeOkuAccordion?: Scope
}

// Emits

export type AccordionImplEmits = {
  keydown: [event: KeyboardEvent]
}

// Context

type AccordionImplContextValue = {
  disabled?: Ref<boolean | undefined>
  direction: Ref<AccordionImplProps['dir']>
  orientation: Ref<AccordionImplProps['orientation']>
}

export const [accordionImplProvider, useAccordionInject] = createAccordionProvider<AccordionImplContextValue>(ACCORDION_NAME)
