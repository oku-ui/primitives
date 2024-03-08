import { createCollection } from '@oku-ui/collection'
import type { AccordionTriggerElement } from './AccordionTrigger'
import { ACCORDION_NAME } from './constants'

export const { CollectionItemSlot, CollectionProvider, CollectionSlot, useCollection, createCollectionScope } = createCollection<AccordionTriggerElement>(ACCORDION_NAME)
