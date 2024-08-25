import type { PopoverContentImplEmits, PopoverContentImplProps } from './PopoverContentImpl'

export interface PopoverContentTypeProps extends Omit<PopoverContentImplProps, 'trapFocus' | 'disableOutsidePointerEvents'> {}

export type PopoverContentTypeEmits = PopoverContentImplEmits

export interface PopoverContentProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}
