import type { PopoverContentImplEmits } from './PopoverContentImpl'

export type PopoverContentNonModal = Omit<PopoverContentImplEmits, 'dismiss'>
