import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { PropType } from 'vue'
import { createCollection } from '@oku-ui/collection'
import {
  createPopperScope,
  popperArrowProps,
  popperContentProps,
} from '@oku-ui/popper'
import { primitiveProps } from '@oku-ui/primitive'
import { dismissableLayerProps } from '@oku-ui/dismissable-layer'
import { focusScopeProps } from '@oku-ui/focus-scope'
import type {
  Direction,
  ItemData,
  SelectContentContextValue,
  SelectGroupContextValue,
  SelectItemContextValue,
  SelectNativeOptionsContextValue,
  SelectProvideValue,
  SelectViewportContextValue,
} from './types'

export const SELECT_NAME = 'OkuSelect'
export const TRIGGER_NAME = 'OkuSelectTrigger'
export const VALUE_NAME = 'OkuSelectValue'
export const LABEL_NAME = 'OkuSelectLabel'
export const GROUP_NAME = 'OkuSelectGroup'
export const ITEM_ALIGNED_POSITION_NAME = 'OkuSelectItemAlignedPosition'
export const POPPER_POSITION_NAME = 'OkuSelectPopperPosition'
export const CONTENT_IMPL_NAME = 'OkuSelectContentImpl'
export const ICON_NAME = 'OkuSelectIcon'
export const CONTENT_NAME = 'OkuSelectContent'
export const SEPARATOR_NAME = 'OkuSelectSeparator'
export const ARROW_NAME = 'OkuSelectArrow'
export const ITEM_NAME = 'OkuSelectItem'
export const ITEM_INDICATOR_NAME = 'OkuSelectItemIndicator'
export const ITEM_TEXT_NAME = 'OkuSelectItemText'

/* -------------------------------------------------------------------------------------------------
 * Select
 * ----------------------------------------------------------------------------------------------- */

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
    // eslint-disable-next-line unused-imports/no-unused-vars
    'valueChange': (value: string) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'openChange': (open: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: string) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
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

export const [createSelectNativeProvide, createSelectNativeScope]
  = createProvideScope(SELECT_NAME, [
    createCollectionScope,
    createPopperScope,
    createSelectScope,
  ])

export const usePopperScope = createPopperScope()

export const [SelectProvider, useSelectInject]
  = createSelectProvide<SelectProvideValue>(SELECT_NAME)

export const [SelectNativeOptionsProvider, useSelectNativeOptionsInject]
  = createSelectNativeProvide<SelectNativeOptionsContextValue>(SELECT_NAME)

/* -------------------------------------------------------------------------------------------------
 * SelectTrigger
 * ----------------------------------------------------------------------------------------------- */

export const selectTriggerProps = {
  props: {
    ...primitiveProps,
    disabled: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: Event) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdown: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    keydown: (event: KeyboardEvent) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectValue
 * ----------------------------------------------------------------------------------------------- */

export const selectValueProps = {
  props: {
    ...primitiveProps,
    placeholder: {
      type: [String, Object] as PropType<string | object>,
      default: '',
    },
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectIcon
 * ----------------------------------------------------------------------------------------------- */

export const selectIconProps = {
  props: {
    ...primitiveProps,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectContent
 * ----------------------------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------------------------------
 * SelectContentImpl
 * ----------------------------------------------------------------------------------------------- */

export const CONTENT_MARGIN = 10

export const [createSelectContentProvide, createSelectContentScope]
  = createProvideScope(CONTENT_NAME, [
    createCollectionScope,
    createPopperScope,
    createSelectScope,
  ])

export const [SelectContentProvider, useSelectContentInject]
  = createSelectContentProvide<SelectContentContextValue>(CONTENT_NAME)

export const selectContentImplProps = {
  props: {
    ...primitiveProps,
    ...popperContentProps.props,
    position: {
      type: String as PropType<'item-aligned' | 'popper'>,
      default: 'item-aligned',
    },
  },
  emits: {
    escapeKeyDown: dismissableLayerProps.emits.escapeKeyDown,
    pointerdownOutside: dismissableLayerProps.emits.pointerdownOutside,
    closeAutoFocus: focusScopeProps.emits.unmountAutoFocus,
  },
}

export const selectContentProps = {
  ...selectContentImplProps,
}

/* -------------------------------------------------------------------------------------------------
 * SelectPopperPosition
 * ----------------------------------------------------------------------------------------------- */

export const selectPopperPositionProps = {
  props: {
    ...primitiveProps,
    align: {
      ...popperContentProps.props.align,
      default: 'start',
    },
    collisionPadding: {
      ...popperContentProps.props.collisionPadding,
      default: CONTENT_MARGIN,
    },
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectItemAlignedPosition
 * ----------------------------------------------------------------------------------------------- */

export const selectItemAlignedPositionProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    placed: popperContentProps.emits.placed,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectViewport
 * ----------------------------------------------------------------------------------------------- */

export const VIEWPORT_NAME = 'OkuSelectViewport'

export const [createSelectViewpointProvide, createSelectViewpointScope]
  = createProvideScope(VIEWPORT_NAME, [
    createCollectionScope,
    createPopperScope,
    createSelectScope,
    createSelectContentScope,
  ])

export const [SelectViewportProvider, useSelectViewportContext]
  = createSelectViewpointProvide<SelectViewportContextValue>(VIEWPORT_NAME)

export const selectViewportProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    onscroll: (event: Event) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectGroup
 * ----------------------------------------------------------------------------------------------- */

export const [createSelectGroupProvide, createSelectGroupScope]
  = createProvideScope(GROUP_NAME, [
    createCollectionScope,
    createPopperScope,
    createSelectScope,
    createSelectContentScope,
  ])

export const [SelectGroupProvider, useSelectGroupInject]
  = createSelectViewpointProvide<SelectGroupContextValue>(GROUP_NAME)

export const selectGroupProps = {
  props: {
    ...primitiveProps,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectLabel
 * ----------------------------------------------------------------------------------------------- */

export const selectLabelProps = {
  props: {
    ...primitiveProps,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectSeparator
 * ----------------------------------------------------------------------------------------------- */

export const selectSeperatorProps = {
  props: {
    ...primitiveProps,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectArrow
 * ----------------------------------------------------------------------------------------------- */

export const selectArrowProps = {
  props: {
    ...primitiveProps,
    ...popperArrowProps,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectItem
 * ----------------------------------------------------------------------------------------------- */

export const [createSelectItemProvide, createSelectItemScope]
  = createProvideScope(ITEM_NAME, [
    createCollectionScope,
    createPopperScope,
    createSelectScope,
    createSelectContentScope,
  ])

export const [SelectItemProvider, useSelectItemInject]
  = createSelectViewpointProvide<SelectItemContextValue>(ITEM_NAME)

export const selectItemProps = {
  props: {
    ...primitiveProps,
    value: {
      type: String as PropType<string>,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    textValue: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectItemText
 * ----------------------------------------------------------------------------------------------- */

export const selectItemTextProps = {
  props: {
    ...primitiveProps,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectItemIndicator
 * ----------------------------------------------------------------------------------------------- */
