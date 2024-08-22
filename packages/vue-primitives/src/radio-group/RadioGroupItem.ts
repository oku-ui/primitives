import type { PrimitiveProps } from '../primitive/Primitive.ts'

export interface RadioGroupItem extends PrimitiveProps {
  disabled?: boolean
  value: string
}

export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
