import { createCollection } from '@oku-ui/collection'
import type { AccordionTriggerElement } from './AccordionTrigger.ts'
import { ACCORDION_NAME } from './constants.ts'

export const { CollectionItemSlot, CollectionProvider, CollectionSlot, useCollection, createCollectionScope } = createCollection<AccordionTriggerElement>(ACCORDION_NAME)
