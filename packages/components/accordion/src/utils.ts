import type { Scope } from '@oku-ui/provide'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import { createCollection } from '@oku-ui/collection'
import { createCollapsibleScope } from '@oku-ui/collapsible'
import type { Ref } from 'vue'
import type { AccordionTriggerElement } from './accordionTrigger'
import type { AccordionImplProps } from './accordionImpl'

export const ACCORDION_KEYS = ['Home', 'End', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight']
export type Direction = 'ltr' | 'rtl'
export type SelectionType = 'single' | 'multiple'
export const ACCORDION_NAME = 'OkuAccordion'

export const { CollectionItemSlot, CollectionProvider, CollectionSlot, useCollection, createCollectionScope } = createCollection<AccordionTriggerElement>(ACCORDION_NAME)

export type ScopeAccordion<T> = T & { scopeOkuAccordion?: Scope }

export const scopeAccordionProps = {
  scopeOkuAccordion: {
    ...ScopePropObject,
  },
}

export const [createAccordionProvider, createAccordionScope] = createProvideScope(ACCORDION_NAME, [
  createCollectionScope,
  createCollapsibleScope,
])

type AccordionValueProviderValue = {
  value: Ref<string[] | string>
  onItemOpen(value: string): void
  onItemClose(value: string): void
}

export const [AccordionValueProvider, useAccordionValueInject]
  = createAccordionProvider<AccordionValueProviderValue>(ACCORDION_NAME)

export const [AccordionCollapsibleProvider, useAccordionCollapsibleInject] = createAccordionProvider(
  ACCORDION_NAME,
  { collapsible: false },
)

type AccordionImplContextValue = {
  disabled?: Ref<boolean | undefined>
  direction: Ref<AccordionImplProps['dir']>
  orientation: Ref<AccordionImplProps['orientation']>
}
export const [AccordionImplProvider, useAccordionInject] = createAccordionProvider<AccordionImplContextValue>(
  ACCORDION_NAME,
)
