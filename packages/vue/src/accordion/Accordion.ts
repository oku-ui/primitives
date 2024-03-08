import { createScope } from '@oku-ui/provide'
import { createCollapsibleScope } from '@oku-ui/collapsible'
import { type Ref, ref } from 'vue'
import type { AccordionSingleProps } from './AccordionSingle.ts'
import type { AccordionMultipleProps } from './AccordionMultiple.ts'
import { ACCORDION_NAME } from './constants.ts'
import { createCollectionScope } from './AccordionCollections.ts'
import type { AccordionImplEmits } from './AccordionImpl.ts'

// Props

type OmitProps = 'value' | 'defaultValue'

export interface AccordionProps extends Omit<AccordionSingleProps, OmitProps>, Omit<AccordionSingleProps, OmitProps> {
  /**
   * The type of accordion.
   *
   * @default single
   */
  type?: 'single' | 'multiple'

  /**
   * The controlled stateful value of the accordion item whose content is expanded.
   */
  value?: AccordionSingleProps['value'] | AccordionMultipleProps['value']

  /**
   * The value of the item whose content is expanded when the accordion is initially rendered. Use
   * `defaultValue` if you do not need to control the state of an accordion.
   */
  defaultValue?: AccordionSingleProps['defaultValue'] | AccordionMultipleProps['defaultValue']
}

// Emits

export type AccordionEmits = AccordionImplEmits & {
  'update:value': [value: string | string[]]
}

// Context

export const [createAccordionProvider, createAccordionScope] = createScope(ACCORDION_NAME, [
  createCollectionScope,
  createCollapsibleScope,
])

export const useCollapsibleScope = createCollapsibleScope()

// Value context

export type AccordionValueProviderValue = {
  value: Ref<string[]>
  onItemOpen: (value: string) => void
  onItemClose: (value: string) => void
}

export const [accordionValueProvider, useAccordionValueInject] = createAccordionProvider<AccordionValueProviderValue>(ACCORDION_NAME)

// Collapsible context

export type AccordionValueCollapsibleValue = {
  collapsible: Ref<boolean>
}

export const [accordionCollapsibleProvider, useAccordionCollapsibleInject] = createAccordionProvider<AccordionValueCollapsibleValue>(ACCORDION_NAME, { collapsible: ref(false) })
