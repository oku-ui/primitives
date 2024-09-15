export interface MenubarSubProps {
  open?: boolean
  defaultOpen?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type MenubarSubEmits = {
  'update:open': [open: boolean]
}
