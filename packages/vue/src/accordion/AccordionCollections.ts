import { createCollection } from '@oku-ui/collection'
import type { AccordionTriggerElement } from './AccordionTrigger.js'
import { ACCORDION_NAME } from './constants.js'

export const { CollectionItemSlot, CollectionProvider, CollectionSlot, useCollection, createCollectionScope } = createCollection<AccordionTriggerElement>(ACCORDION_NAME)
