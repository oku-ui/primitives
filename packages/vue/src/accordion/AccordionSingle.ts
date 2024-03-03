import type { AccordionImplEmits, AccordionImplProps } from './AccordionImpl.js'

// Props

export interface AccordionSingleProps extends AccordionImplProps {
  /**
   * The controlled stateful value of the accordion item whose content is expanded.
   */
  modelValue?: string
  /**
   * The value of the item whose content is expanded when the accordion is initially rendered. Use
   * `defaultValue` if you do not need to control the state of an accordion.
   */
  defaultValue?: string

  /**
   * Whether an accordion item can be collapsed after it has been opened.
   * @default false
   */
  collapsible?: boolean
}

// Emits

export type AccordionSingleEmits = AccordionImplEmits & {
  'update:modelValue': [value: string]
}
