import type { PropType } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { getInvalidOrientationError, isValidOrientation } from './utils'

export const SEPARATOR_NAME = 'OkuSeparator'

/* -------------------------------------------------------------------------------------------------
 *  Separator - separator.ts
 * ----------------------------------------------------------------------------------------------- */

export type SeparatorNativeElement = OkuElement<'div'>
export type SeparatorElement = HTMLDivElement

export const DEFAULT_ORIENTATION = 'horizontal'
export const ORIENTATIONS = ['horizontal', 'vertical'] as const

export type Orientation = typeof ORIENTATIONS[number]

export interface SeparatorProps extends PrimitiveProps {
  /**
   * Either `vertical` or `horizontal`. Defaults to `horizontal`.
   */
  orientation?: Orientation
  /**
   * Whether or not the component is purely decorative. When true, accessibility-related attributes
   * are updated so that that the rendered element is removed from the accessibility tree.
   */
  decorative?: boolean
}

export const separatorProps = {
  props: {
    orientation: {
      type: String as PropType<SeparatorProps['orientation']>,
      default: DEFAULT_ORIENTATION,
      validator: (value: string): boolean => {
        if (!isValidOrientation(value))
          console.error(getInvalidOrientationError(String(value), SEPARATOR_NAME))

        return true
      },
    },
    decorative: {
      type: Boolean as PropType<SeparatorProps['decorative']>,
    },
    ...primitiveProps,
  },
  emits: { },
}
