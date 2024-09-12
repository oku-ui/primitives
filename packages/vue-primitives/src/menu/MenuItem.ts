// eslint-disable-next-line ts/consistent-type-definitions
export type MenuItemProps = {
  disabled?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type MenuItemEmits = {
  select: [event: Event]
  click: [event: MouseEvent]
  pointerup: [event: PointerEvent]
  keydown: [event: KeyboardEvent]
}

export const ITEM_SELECT = 'menu.itemSelect'
