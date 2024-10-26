import { createCollection } from '../collection/index.ts'

export const [Collection, useCollection] = createCollection<HTMLLIElement>('Toast')
