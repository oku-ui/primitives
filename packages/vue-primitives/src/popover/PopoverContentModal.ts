import type { PopoverContentImplEmits } from './PopoverContentImpl.ts'

export type PopoverContentModalEmits = Omit<PopoverContentImplEmits, 'dismiss'>
