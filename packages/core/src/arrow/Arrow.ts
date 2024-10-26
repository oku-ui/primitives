import type { PrimitiveProps } from '../primitive/index.ts'

export interface ArrowProps extends PrimitiveProps {
  /**
   * The width of the arrow in pixels.
   *
   * @defaultValue 10
   */
  width?: number
  /**
   * The height of the arrow in pixels.
   *
   * @defaultValue 5
   */
  height?: number
}
