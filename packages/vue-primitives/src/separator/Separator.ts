import type { PrimitiveProps } from '~/primitive/index.ts'

export interface SeparatorProps extends PrimitiveProps {
  /**
   * Either `vertical` or `horizontal`. Defaults to `horizontal`.
   */
  orientation?: 'vertical' | 'horizontal'
  /**
   * Whether or not the component is purely decorative. When true, accessibility-related attributes
   * are updated so that that the rendered element is removed from the accessibility tree.
   */
  decorative?: boolean
}
