import type { AccordionImplEmits, AccordionImplProps } from './AccordionImpl'

// Props

export interface AccordionMultipleProps extends AccordionImplProps {
  /**
   * The controlled stateful value of the accordion item whose content is expanded.
   */
  value?: string[]

  /**
   * The value of the item whose content is expanded when the accordion is initially rendered. Use
   * `defaultValue` if you do not need to control the state of an accordion.
   */
  defaultValue?: string[]
}

// Emits

export type AccordionMultipleEmits = AccordionImplEmits & {
  'update:value': [value: string[]]
}
