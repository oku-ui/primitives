import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'

export const CONTENT_NAME = 'OkuAccordionContent'

// Props

export interface AccordionContentProps extends PrimitiveProps {
  /**
   * The controlled stateful value of the accordion item whose content is expanded.
   */
  value?: string[]

  /**
   * The value of the item whose content is expanded when the accordion is initially rendered. Use
   * `defaultValue` if you do not need to control the state of an accordion.
   */
  defaultValue?: string[]

  scopeOkuAccordion: Scope
}
