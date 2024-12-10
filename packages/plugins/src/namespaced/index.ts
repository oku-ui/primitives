import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogRoot, AlertDialogTitle, AlertDialogTrigger, AspectRatio, AvatarFallback, AvatarImage, AvatarRoot, CheckboxIndicator, CheckboxRoot, CollapsibleContent, CollapsibleRoot, CollapsibleTrigger, ContextMenuArrow, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuItemIndicator, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuRoot, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger, DropdownMenuArrow, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuItemIndicator, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuRoot, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger, Label, MenubarArrow, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarItemIndicator, MenubarLabel, MenubarMenu, MenubarPortal, MenubarRadioGroup, MenubarRadioItem, MenubarRoot, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger, PopoverAnchor, PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger, ProgressIndicator, ProgressRoot, RadioGroupIndicator, RadioGroupItem, RadioGroupRoot, ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport, Separator, SliderRange, SliderRoot, SliderThumb, SliderTrack, SwitchRoot, SwitchThumb, TabsContent, TabsList, TabsRoot, TabsTrigger, ToastAction, ToastClose, ToastDescription, ToastRoot, ToastTitle, ToastViewport, Toggle, ToggleGroupItem, ToggleGroupRoot, ToolbarButton, ToolbarLink, ToolbarRoot, ToolbarSeparator, ToolbarToggleGroup, ToolbarToggleItem, TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from '@oku-ui/primitives'

export const Accordion = {
  Content: AccordionContent,
  Header: AccordionHeader,
  Item: AccordionItem,
  Root: AccordionRoot,
  Trigger: AccordionTrigger,
} as {
  Content: typeof AccordionContent
  Header: typeof AccordionHeader
  Item: typeof AccordionItem
  Root: typeof AccordionRoot
  Trigger: typeof AccordionTrigger
}

export const AlertDialog = {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Portal: AlertDialogPortal,
  Content: AlertDialogContent,
  Overlay: AlertDialogOverlay,
  Cancel: AlertDialogCancel,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
} as {
  Root: typeof AlertDialogRoot
  Trigger: typeof AlertDialogTrigger
  Portal: typeof AlertDialogPortal
  Content: typeof AlertDialogContent
  Overlay: typeof AlertDialogOverlay
  Cancel: typeof AlertDialogCancel
  Title: typeof AlertDialogTitle
  Description: typeof AlertDialogDescription
  Action: typeof AlertDialogAction
}

export { AspectRatio }

export const Avatar = {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
} as {
  Root: typeof AvatarRoot
  Image: typeof AvatarImage
  Fallback: typeof AvatarFallback
}

export const Checkbox = {
  Root: CheckboxRoot,
  Indicator: CheckboxIndicator,
} as {
  Root: typeof CheckboxRoot
  Indicator: typeof CheckboxIndicator
}

export const Collapsible = {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
} as {
  Root: typeof CollapsibleRoot
  Trigger: typeof CollapsibleTrigger
  Content: typeof CollapsibleContent
}

export const ContextMenu = {
  Root: ContextMenuRoot,
  Trigger: ContextMenuTrigger,
  Portal: ContextMenuPortal,
  Content: ContextMenuContent,
  Arrow: ContextMenuArrow,
  Item: ContextMenuItem,
  Group: ContextMenuGroup,
  Separator: ContextMenuSeparator,
  CheckboxItem: ContextMenuCheckboxItem,
  ItemIndicator: ContextMenuItemIndicator,
  Label: ContextMenuLabel,
  RadioGroup: ContextMenuRadioGroup,
  RadioItem: ContextMenuRadioItem,
  Sub: ContextMenuSub,
  SubContent: ContextMenuSubContent,
  SubTrigger: ContextMenuSubTrigger,
} as {
  Root: typeof ContextMenuRoot
  Trigger: typeof ContextMenuTrigger
  Portal: typeof ContextMenuPortal
  Content: typeof ContextMenuContent
  Arrow: typeof ContextMenuArrow
  Item: typeof ContextMenuItem
  Group: typeof ContextMenuGroup
  Separator: typeof ContextMenuSeparator
  CheckboxItem: typeof ContextMenuCheckboxItem
  ItemIndicator: typeof ContextMenuItemIndicator
  Label: typeof ContextMenuLabel
  RadioGroup: typeof ContextMenuRadioGroup
  RadioItem: typeof ContextMenuRadioItem
  Sub: typeof ContextMenuSub
  SubContent: typeof ContextMenuSubContent
  SubTrigger: typeof ContextMenuSubTrigger
}

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Content: DialogContent,
  Overlay: DialogOverlay,
  Close: DialogClose,
  Title: DialogTitle,
  Description: DialogDescription,
} as {
  Root: typeof DialogRoot
  Trigger: typeof DialogTrigger
  Portal: typeof DialogPortal
  Content: typeof DialogContent
  Overlay: typeof DialogOverlay
  Close: typeof DialogClose
  Title: typeof DialogTitle
  Description: typeof DialogDescription
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Portal: DropdownMenuPortal,
  Content: DropdownMenuContent,
  Arrow: DropdownMenuArrow,
  Item: DropdownMenuItem,
  Group: DropdownMenuGroup,
  Separator: DropdownMenuSeparator,
  CheckboxItem: DropdownMenuCheckboxItem,
  ItemIndicator: DropdownMenuItemIndicator,
  Label: DropdownMenuLabel,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Sub: DropdownMenuSub,
  SubContent: DropdownMenuSubContent,
  SubTrigger: DropdownMenuSubTrigger,
} as {
  Root: typeof DropdownMenuRoot
  Trigger: typeof DropdownMenuTrigger
  Portal: typeof DropdownMenuPortal
  Content: typeof DropdownMenuContent
  Arrow: typeof DropdownMenuArrow
  Item: typeof DropdownMenuItem
  Group: typeof DropdownMenuGroup
  Separator: typeof DropdownMenuSeparator
  CheckboxItem: typeof DropdownMenuCheckboxItem
  ItemIndicator: typeof DropdownMenuItemIndicator
  Label: typeof DropdownMenuLabel
  RadioGroup: typeof DropdownMenuRadioGroup
  RadioItem: typeof DropdownMenuRadioItem
  Sub: typeof DropdownMenuSub
  SubContent: typeof DropdownMenuSubContent
  SubTrigger: typeof DropdownMenuSubTrigger
}

export const HoverCard = {
  Root: HoverCardRoot,
  Trigger: HoverCardTrigger,
  Portal: HoverCardPortal,
  Content: HoverCardContent,
  Arrow: HoverCardArrow,
} as {
  Root: typeof HoverCardRoot
  Trigger: typeof HoverCardTrigger
  Portal: typeof HoverCardPortal
  Content: typeof HoverCardContent
  Arrow: typeof HoverCardArrow
}

export { Label }

export const Menubar = {
  Root: MenubarRoot,
  Trigger: MenubarTrigger,
  Portal: MenubarPortal,
  Content: MenubarContent,
  Arrow: MenubarArrow,
  Item: MenubarItem,
  Group: MenubarGroup,
  Separator: MenubarSeparator,
  CheckboxItem: MenubarCheckboxItem,
  ItemIndicator: MenubarItemIndicator,
  Label: MenubarLabel,
  RadioGroup: MenubarRadioGroup,
  RadioItem: MenubarRadioItem,
  Sub: MenubarSub,
  SubContent: MenubarSubContent,
  SubTrigger: MenubarSubTrigger,
  Menu: MenubarMenu,
} as {
  Root: typeof MenubarRoot
  Trigger: typeof MenubarTrigger
  Portal: typeof MenubarPortal
  Content: typeof MenubarContent
  Arrow: typeof MenubarArrow
  Item: typeof MenubarItem
  Group: typeof MenubarGroup
  Separator: typeof MenubarSeparator
  CheckboxItem: typeof MenubarCheckboxItem
  ItemIndicator: typeof MenubarItemIndicator
  Label: typeof MenubarLabel
  RadioGroup: typeof MenubarRadioGroup
  RadioItem: typeof MenubarRadioItem
  Sub: typeof MenubarSub
  SubContent: typeof MenubarSubContent
  SubTrigger: typeof MenubarSubTrigger
  Menu: typeof MenubarMenu
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Portal: PopoverPortal,
  Content: PopoverContent,
  Arrow: PopoverArrow,
  Close: PopoverClose,
  Anchor: PopoverAnchor,
} as {
  Root: typeof PopoverRoot
  Trigger: typeof PopoverTrigger
  Portal: typeof PopoverPortal
  Content: typeof PopoverContent
  Arrow: typeof PopoverArrow
  Close: typeof PopoverClose
  Anchor: typeof PopoverAnchor
}

export const Progress = {
  Root: ProgressRoot,
  Indicator: ProgressIndicator,
} as {
  Root: typeof ProgressRoot
  Indicator: typeof ProgressIndicator
}

export const RadioGroup = {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
  Indicator: RadioGroupIndicator,
} as {
  Root: typeof RadioGroupRoot
  Item: typeof RadioGroupItem
  Indicator: typeof RadioGroupIndicator
}

export const ScrollArea = {
  Root: ScrollAreaRoot,
  Viewport: ScrollAreaViewport,
  Scrollbar: ScrollAreaScrollbar,
  Thumb: ScrollAreaThumb,
  Corner: ScrollAreaCorner,
} as {
  Root: typeof ScrollAreaRoot
  Viewport: typeof ScrollAreaViewport
  Scrollbar: typeof ScrollAreaScrollbar
  Thumb: typeof ScrollAreaThumb
  Corner: typeof ScrollAreaCorner
}

export { Separator }

export const Slider = {
  Root: SliderRoot,
  Thumb: SliderThumb,
  Track: SliderTrack,
  Range: SliderRange,
} as {
  Root: typeof SliderRoot
  Thumb: typeof SliderThumb
  Track: typeof SliderTrack
  Range: typeof SliderRange
}

export const Switch = {
  Root: SwitchRoot,
  Thumb: SwitchThumb,
} as {
  Root: typeof SwitchRoot
  Thumb: typeof SwitchThumb
}

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Content: TabsContent,
  Trigger: TabsTrigger,
} as {
  Root: typeof TabsRoot
  List: typeof TabsList
  Content: typeof TabsContent
  Trigger: typeof TabsTrigger
}

export const Toast = {
  Root: ToastRoot,
  Action: ToastAction,
  Close: ToastClose,
  Viewport: ToastViewport,
  Title: ToastTitle,
  Description: ToastDescription,
} as {
  Root: typeof ToastRoot
  Action: typeof ToastAction
  Close: typeof ToastClose
  Viewport: typeof ToastViewport
  Title: typeof ToastTitle
  Description: typeof ToastDescription
}

export { Toggle }

export const ToggleGroup = {
  Root: ToggleGroupRoot,
  Item: ToggleGroupItem,
} as {
  Root: typeof ToggleGroupRoot
  Item: typeof ToggleGroupItem
}

export const Toolbar = {
  Root: ToolbarRoot,
  Button: ToolbarButton,
  Link: ToolbarLink,
  ToggleGroup: ToolbarToggleGroup,
  ToggleItem: ToolbarToggleItem,
  Separator: ToolbarSeparator,
} as {
  Root: typeof ToolbarRoot
  Button: typeof ToolbarButton
  Link: typeof ToolbarLink
  ToggleGroup: typeof ToolbarToggleGroup
  ToggleItem: typeof ToolbarToggleItem
  Separator: typeof ToolbarSeparator
}

export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Arrow: TooltipArrow,
  Portal: TooltipPortal,
  Provider: TooltipProvider,
} as {
  Root: typeof TooltipRoot
  Trigger: typeof TooltipTrigger
  Content: typeof TooltipContent
  Arrow: typeof TooltipArrow
  Portal: typeof TooltipPortal
  Provider: typeof TooltipProvider
}
