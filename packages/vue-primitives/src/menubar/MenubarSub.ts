export interface MenubarSubProps {
  open?: boolean
  defaultOpen?: boolean
}

export type MenubarSubEmits = {
  'update:open': [open: boolean]
}
