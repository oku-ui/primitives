export interface ContextMenuSubProps {
  open?: boolean
  defaultOpen?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type ContextMenuSubEmits = {
  'update:open': [isOpen: boolean]
}
