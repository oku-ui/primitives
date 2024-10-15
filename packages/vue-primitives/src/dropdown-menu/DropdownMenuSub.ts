export interface DropdownMenuSubProps {
  open?: boolean
  defaultOpen?: boolean
}

export type DropdownMenuSubEmits = {
  'update:open': [open: boolean]
}
