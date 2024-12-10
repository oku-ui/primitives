import type { EmitsToHookProps, PrimitiveDefaultProps } from '../shared'
import { type CollectionItemWithData, createCollection } from '../collection'
import { type Direction, useDirection } from '../direction'
import { createContext, type MutableRefObject, useControllableStateV2, useRef } from '../hooks'
import { type MaybeRefOrGetter, type Ref, shallowRef, useId } from 'vue'

export interface SelectRootProps {
  value?: string
  defaultValue?: string
  open?: boolean
  defaultOpen?: boolean
  dir?: Direction
  name?: string
  autocomplete?: string
  disabled?: boolean
  required?: boolean
  form?: string
}

export const DEFAULT_SELECT_ROOT_PROPS = {
  open: undefined,
  defaultOpen: undefined,
  disabled: undefined,
  required: undefined,
} satisfies PrimitiveDefaultProps<SelectRootProps>

export type SelectRootEmits = {
  'update:value': [value: string]
  'update:open': [open: boolean]
}

export interface SelectContextValue {
  trigger: Ref<HTMLElement | undefined>
  valueNode: Ref<HTMLElement | undefined>
  valueNodeHasChildren: Ref<boolean>
  onValueNodeHasChildrenChange: (hasChildren: boolean) => void
  contentId: string
  value: Ref<string | undefined>
  onValueChange: (value: string) => void
  open: Ref<boolean>
  required?: () => boolean | undefined
  onOpenChange: (open: boolean) => void
  dir: Ref<Direction>
  triggerPointerDownPosRef: MutableRefObject<{ x: number, y: number } | undefined>
  disabled?: () => boolean | undefined
};

export const [provideSelectContext, useSelectContext] = createContext<SelectContextValue>('Select')

export interface ItemData {
  $select: {
    value: string
    disabled?: boolean
    textValue: string
  }
}
export type CollectionItem = CollectionItemWithData<HTMLElement, ItemData>
export const [Collection, useCollection] = createCollection<HTMLElement, ItemData>('Menu')

export interface UseSelectRootProps extends EmitsToHookProps<SelectRootEmits> {
  value?: () => string | undefined
  defaultValue?: string
  open?: () => boolean | undefined
  defaultOpen?: boolean
  dir?: MaybeRefOrGetter<Direction | undefined>
  name?: () => string | undefined
  autocomplete?: string
  disabled?: () => boolean | undefined
  required?: () => boolean | undefined
  form?: string
}

export function useSelectRoot(props: UseSelectRootProps = {}) {
  const {
    defaultOpen = false,
    disabled = () => undefined,
    required = () => undefined,
  } = props

  const trigger = shallowRef<HTMLElement>()
  const valueNode = shallowRef<HTMLElement>()

  const valueNodeHasChildren = shallowRef(false)
  const direction = useDirection(props.dir)

  const open = useControllableStateV2(props.open, props.onUpdateOpen, defaultOpen)
  const value = useControllableStateV2(props.value, props.onUpdateValue, props.defaultValue)

  const triggerPointerDownPosRef = useRef<{ x: number, y: number }>()

  provideSelectContext({
    required,
    trigger,
    valueNode,
    valueNodeHasChildren,
    onValueNodeHasChildrenChange(hasChildren) {
      valueNodeHasChildren.value = hasChildren
    },
    contentId: useId(),
    value,
    onValueChange(v) {
      value.value = v
    },
    open,
    onOpenChange(v) {
      open.value = v
    },
    dir: direction,
    triggerPointerDownPosRef,
    disabled,
  })
}
