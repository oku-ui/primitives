export type MenuItemProps = {
  disabled?: boolean
}

export type MenuItemEmits = {
  select: [event: Event]
  click: [event: MouseEvent]
  pointerup: [event: PointerEvent]
  keydown: [event: KeyboardEvent]
}

export const ITEM_SELECT = 'menu.itemSelect'
