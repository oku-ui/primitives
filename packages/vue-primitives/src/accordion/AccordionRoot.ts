import type { AriaAttributes, Ref } from 'vue'
import type { Direction } from '../direction/Direction.ts'
import { createCollection } from '../collection/index.ts'
import { createContext } from '../hooks/index.ts'

export type AccordionType = 'single' | 'multiple'

export interface AccordionRootProps<T extends AccordionType> extends AccordionImplProps {
  type: T

  value?: T extends 'single' ? AccordionSingleProps['value'] : AccordionMultipleProps['value']

  defaultValue?: T extends 'single' ? AccordionSingleProps['defaultValue'] : AccordionMultipleProps['defaultValue']

  collapsible?: AccordionSingleProps['collapsible']
}

// eslint-disable-next-line ts/consistent-type-definitions
export type AccordionRootEmits<T extends AccordionType> = {
  /**
   * The callback that fires when the state of the toggle group changes.
   */
  'update:value': [value: T extends 'single' ? NonNullable<AccordionSingleProps['value']> : NonNullable<AccordionMultipleProps['value']>]

  'keydown': [event: KeyboardEvent]
}

interface AccordionSingleProps {
  /**
   * The controlled stateful value of the accordion item whose content is expanded.
   */
  value?: string
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

interface AccordionMultipleProps {
  /**
   * The controlled stateful value of the accordion items whose contents are expanded.
   */
  value?: string[]
  /**
   * The value of the items whose contents are expanded when the accordion is initially rendered. Use
   * `defaultValue` if you do not need to control the state of an accordion.
   */
  defaultValue?: string[]
}

export interface AccordionImplProps {
  /**
   * Whether or not an accordion is disabled from user interaction.
   *
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * The layout in which the Accordion operates.
   * @default vertical
   */
  orientation?: AriaAttributes['aria-orientation']
  /**
   * The language read direction.
   */
  dir?: Direction
}

export const ACCORDION_KEYS = ['Home', 'End', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight']

export const [Collection, useCollection] = createCollection<HTMLButtonElement>('Accordion')

export interface AccordionContext {
  id: string
  collapsible: boolean

  disabled: () => boolean
  direction: Ref<Direction>
  orientation: AriaAttributes['aria-orientation']

  value: Ref<string[]>
  onItemOpen: (value: string) => void
  onItemClose: (value: string) => void
}

export const [provideAccordionContext, useAccordionContext] = createContext<AccordionContext>('AccordionContext')
