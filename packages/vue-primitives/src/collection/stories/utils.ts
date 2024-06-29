import { createCollection } from '../index.ts'

export interface ItemData { disabled: boolean }

export const [Collection, useCollection] = createCollection<HTMLElement, ItemData>('List')
