import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { ref } from 'vue'
import type { PropType, Ref } from 'vue'
import type { Scope } from '@oku-ui/provide'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import { createCollection } from '@oku-ui/collection'
import type { RovingFocusGroupProps } from '@oku-ui/roving-focus'
import { collapsibleContentProps, collapsibleProps, collapsibleTriggerProps, createCollapsibleScope } from '@oku-ui/collapsible'
import type { CollapsibleContentProps, CollapsibleProps, CollapsibleTriggerEmits, CollapsibleTriggerProps } from '@oku-ui/collapsible'

import { propsOmit } from '@oku-ui/primitive'

export const ACCORDION_NAME = 'OkuAccordion'
export const ITEM_NAME = 'OkuAccordionItem'
export const CONTENT_NAME = 'OkuAccordionContent'
export const HEADER_NAME = 'OkuAccordionHeader'
export const ACCORDION_IMPL_NAME = 'OkuAccordionImpl'
export const ACCORDION_IMPL_MULTIPLE_NAME = 'OkuAccordionImplMultiple'
export const ACCORDION_IMPL_SINGLE_NAME = 'OkuAccordionImplSingle'
export const TRIGGER_NAME = 'OkuAccordionTrigger'

export const ACCORDION_KEYS = ['Home', 'End', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight']

export type Direction = 'ltr' | 'rtl'
export type SelectionType = 'single' | 'multiple'

/* -------------------------------------------------------------------------- */
/*                   AccordionTrigger - accordionTrigger.ts                   */
/* -------------------------------------------------------------------------- */

export type AccordionTriggerNativeElement = OkuElement<'button'>

export type AccordionTriggerElement = HTMLButtonElement

export interface AccordionTriggerProps extends CollapsibleTriggerProps {}

export interface AccordionTriggerEmits extends CollapsibleTriggerEmits {}

export const accordionTriggerProps = {
  props: {
    ...collapsibleTriggerProps.props,
  },
  emits: {
    ...collapsibleTriggerProps.emits,
  },
}
/* -------------------------------------------------------------------------- */
/*                              ****************                              */
/* -------------------------------------------------------------------------- */
export const { CollectionItemSlot, CollectionProvider, CollectionSlot, useCollection, createCollectionScope } = createCollection<AccordionTriggerElement>(ACCORDION_NAME)

export type ScopeAccordion<T> = T & { scopeOkuAccordion?: Scope }

export const scopeAccordionProps = {
  scopeOkuAccordion: {
    ...ScopePropObject,
  },
}

export const [createAccordionProvider, createAccordionScope] = createProvideScope(ACCORDION_NAME, [
  createCollectionScope,
  createCollapsibleScope,
])

export const useCollapsibleScope = createCollapsibleScope()

type AccordionValueProviderValue = {
  value: Ref<string[]>
  onItemOpen(value: string): void
  onItemClose(value: string): void
}

export const [AccordionValueProvider, useAccordionValueInject]
  = createAccordionProvider<AccordionValueProviderValue>(ACCORDION_NAME)

export const [AccordionCollapsibleProvider, useAccordionCollapsibleInject] = createAccordionProvider(
  ACCORDION_NAME,
  { collapsible: ref(false) },
)
type AccordionImplContextValue = {
  disabled?: Ref<boolean | undefined>
  direction: Ref<AccordionImplProps['dir']>
  orientation: Ref<AccordionImplProps['orientation']>
}
export const [AccordionImplProvider, useAccordionInject] = createAccordionProvider<AccordionImplContextValue>(
  ACCORDION_NAME,
)
type AccordionItemContextValue =
{ open?: Ref<boolean>
  disabled?: Ref<boolean | undefined>
  triggerId: Ref<string>
}
export const [AccordionItemProvider, useAccordionItemInject]
  = createAccordionProvider<AccordionItemContextValue>(ITEM_NAME)

/* -------------------------------------------------------------------------- */
/*                                  Accordion - accordion.ts                                 */
/* -------------------------------------------------------------------------- */

export type AccordionNativeElement = OkuElement<'div'>

export type AccordionElement = HTMLDivElement

export interface AccordionSingleProps extends AccordionImplSingleProps {
  type: 'single'
}

export interface AccordionSingleEmits extends AccordionImplSingleEmits {
}

export interface AccordionMultipleProps extends AccordionImplMultipleProps {
  type: 'multiple'
}

export interface AccordionMultipleEmits extends AccordionImplMultipleEmits {
}
export const accordionProps = {
  props: {
    value: {
      type: [String, Array, undefined] as PropType<string | string[] | undefined>,
      default: undefined,
    },
    type: {
      type: String as PropType<SelectionType>,
      default: 'single',
    },
    defaultValue: {
      type: [String, Array, undefined] as PropType<string | string[] | undefined>,
      default: undefined,
    },
    /**
   * Whether an accordion item can be collapsed after it has been opened.
   * @default false
   */
    collapsible: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
  },
  emits: {
    /**
   * The callback that fires when the state of the accordion changes.
   */
    // eslint-disable-next-line unused-imports/no-unused-vars
    valueChange: (value: string | string[]) => true,
  },
}

/* -------------------------------------------------------------------------- */
/*                   AccordionContent - accordionContent.ts                   */
/* -------------------------------------------------------------------------- */

export type AccordionContentNativeElement = OkuElement<'div'>

export type AccordionContentElement = HTMLDivElement

export interface AccordionContentProps extends CollapsibleContentProps {}

export const accordionContentProps = {
  props: {
    ...collapsibleContentProps.props,
  },
  emits: {
  },
}

/* -------------------------------------------------------------------------- */
/*                   AccordionContent - accordionContent.ts                   */
/* -------------------------------------------------------------------------- */
export type AccordionHeaderNativeElement = OkuElement<'h3'>

export interface AccordionHeaderProps extends PrimitiveProps {}

export const accordionHeaderProps = {
  props: {

  },
  emits: {
  },
}

/* -------------------------------------------------------------------------- */
/*                      AccordionImpl - accordionImpl.ts                      */
/* -------------------------------------------------------------------------- */

export type AccordionImplNativeElement = OkuElement<'div'>

export interface AccordionImplProps extends PrimitiveProps {
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
  orientation?: RovingFocusGroupProps['orientation']
  /**
   * The language read direction.
   */
  dir?: RovingFocusGroupProps['dir']

}
export interface AccordionImplEmits {
  valueChange: [value: string | string[]]
  keydown: [event: KeyboardEvent]
}
export const accordionImplProps = {
  props: {
    disabled: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
    orientation: {
      type: String as PropType<RovingFocusGroupProps['orientation']>,
      default: 'vertical',
    },
    dir: {
      type: String as PropType<RovingFocusGroupProps['dir']>,
      default: undefined,
    },
  },
  emits: {
    /**
   * The callback that fires when the state of the accordion changes.
   */
    // eslint-disable-next-line unused-imports/no-unused-vars
    valueChange: (value: string | string[]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    keydown: (event: KeyboardEvent) => true,
  },
}
/* -------------------------------------------------------------------------- */
/*              AccordionImplMultiple - accordionImplMultiple.ts              */
/* -------------------------------------------------------------------------- */
export type AccordionImplMultipleNativeElement = OkuElement<'div'>

export type AccordionImplMultipleElement = HTMLDivElement

export interface AccordionImplMultipleProps extends AccordionImplProps {
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
export interface AccordionImplMultipleEmits extends AccordionImplEmits {
  /**
   * The callback that fires when the state of the accordion changes.
   */
  valueChange: [value: string[]]
}
export const accordionImplMultipleProps = {
  props: {
    ...accordionImplProps.props,
    modelValue: {
      type: [Array, undefined] as PropType<string[] | undefined>,
      default: undefined,
    },
    value: {
      type: [Array, undefined] as PropType<string[] | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: [Array, undefined] as PropType<string[] | undefined>,
      default: undefined,
    },
  },
  emits: {
    ...accordionImplProps.emits,
    /**
   * The callback that fires when the state of the accordion changes.
   */
    // eslint-disable-next-line unused-imports/no-unused-vars
    'valueChange': (value: string[]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: string[]) => true,
  },
}

/* -------------------------------------------------------------------------- */
/*                AccordionImplSingle - accordionImplSingle.ts                */
/* -------------------------------------------------------------------------- */
export type AccordionImplSingleNativeElement = OkuElement<'div'>

export interface AccordionImplSingleProps extends AccordionImplProps {
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
export interface AccordionImplSingleEmits extends AccordionImplEmits {
  /**
   * The callback that fires when the state of the accordion changes.
   */

  valueChange: [value: string]
}

export const accordionImplSingleProps = {
  props: {
    ...accordionImplProps.props,
    modelValue: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    value: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    collapsible: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: false,
    },
  },
  emits: {
    ...accordionImplProps.emits,
    /**
   * The callback that fires when the state of the accordion changes.
   */
    // eslint-disable-next-line unused-imports/no-unused-vars
    'valueChange': (value: string) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: string) => true,
  },
}
/* -------------------------------------------------------------------------- */
/*                      AccordionItem - accordionItem.ts                      */
/* -------------------------------------------------------------------------- */

export type AccordionItemNativeElement = OkuElement<'div'>

export interface AccordionItemProps extends Omit<CollapsibleProps, 'open' | 'defaultOpen' | 'openChange'> {
  /**
   * Whether or not an accordion is disabled from user interaction.
   *
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * A string value for the accordion item. All items within an accordion should use a unique value.
   */
  value: string

}
export interface AccordionItemEmits extends Omit<CollapsibleProps, 'open' | 'defaultOpen' | 'openChange'> {
}

export const accordionItemProps = {
  props: {
    ...propsOmit(collapsibleProps.props, ['open', 'defaultOpen']),
    disabled: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
    },
    value: {
      type: String as PropType<string>,
    },
  },
  emits: {
    ...propsOmit(collapsibleProps.emits, ['openChange']),
  },
}
