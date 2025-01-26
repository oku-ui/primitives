import type { PrimitiveDefaultProps, PrimitiveElAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'

export interface SeparatorProps {
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

export const DEFAULT_SEPARATOR_PROPS = {
  decorative: undefined,
} satisfies PrimitiveDefaultProps<SeparatorProps>

export interface UseSeparatorProps {
  decorative?: SeparatorProps['decorative']
  orientation?: SeparatorProps['orientation']
}

export function useSeparator(props: UseSeparatorProps): RadixPrimitiveReturns {
  const { orientation = 'horizontal' } = props

  return {
    attrs(extraAttrs) {
      const attrs: PrimitiveElAttrs = props.decorative
        ? {
            'role': 'none',
            'data-orientation': orientation,
          }
        : {
            'aria-orientation': orientation === 'vertical' ? orientation : undefined,
            'role': 'separator',
            'data-orientation': orientation,
          }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
