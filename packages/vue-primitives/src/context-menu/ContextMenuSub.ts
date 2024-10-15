export interface ContextMenuSubProps {
  open?: boolean
  defaultOpen?: boolean
}

export type ContextMenuSubEmits = {
  'update:open': [isOpen: boolean]
}
