import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { PropType } from 'vue'
import { createCollection } from '@oku-ui/collection'
import { createPopperScope } from '@oku-ui/popper'
import { primitiveProps } from '@oku-ui/primitive'
import type {
  Direction,
  ItemData,
  SelectNativeOptionsContextValue,
  SelectProvideValue,
} from './types'

/* -------------------------------------------------------------------------------------------------
 * SelectTrigger
 * ----------------------------------------------------------------------------------------------- */
export const SELECT_NAME = 'OkuSelect'

export const scopeSelectProps = {
  scopeOkuSelect: {
    ...ScopePropObject,
  },
}

export const selectProps = {
  props: {
    ...primitiveProps,
    value: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    modelValue: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    dir: {
      type: String as PropType<Direction>,
      default: 'single',
    },
    open: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
    openValue: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
    defaultOpen: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
    autoComplete: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    name: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    required: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
    disabled: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
  },
  emits: {
    'valueChange': (value: string) => true,
    'openChange': (open: boolean) => true,
    'update:modelValue': (value: string) => true,
    'update:openValue': (open: boolean) => true,
  },
}

export const {
  CollectionItemSlot,
  CollectionProvider,
  CollectionSlot,
  useCollection,
  createCollectionScope,
} = createCollection<HTMLSelectElement, ItemData>(SELECT_NAME)

export const [createSelectProvide, createSelectScope] = createProvideScope(
  SELECT_NAME,
  [createCollectionScope, createPopperScope],
)

export const usePopperScope = createPopperScope()

export const [SelectProvider, useSelectInject]
  = createSelectProvide<SelectProvideValue>(SELECT_NAME)

export const [SelectNativeOptionsProvider, useSelectNativeOptionsInject]
  = createSelectProvide<SelectNativeOptionsContextValue>(SELECT_NAME)

/* -------------------------------------------------------------------------------------------------
 * SelectTrigger
 * ----------------------------------------------------------------------------------------------- */

export const TRIGGER_NAME = 'OkuSelectTrigger'

export const selectTriggerProps = {
  props: {
    disabled: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
  },
  emits: {
    click: (event: Event) => true,
    pointerdown: (event: PointerEvent) => true,
    keydown: (event: KeyboardEvent) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectValue
 * ----------------------------------------------------------------------------------------------- */

export const VALUE_NAME = 'OkuSelectValue'

export const selectValueProps = {
  props: {
    placeholder: {
      type: [String, Object] as PropType<string | object>,
      default: '',
    },
  },
}
