export interface DropdownMenuSubProps {
  open?: boolean
  defaultOpen?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type DropdownMenuSubEmits = {
  'update:open': [open: boolean]
}
