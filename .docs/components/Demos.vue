<script setup lang="ts">
import AccordionDemo from './demo/Accordion/tailwind/index.vue'
import AlertDialogDemo from './demo/AlertDialog/tailwind/index.vue'
import AspectRatioDemo from './demo/AspectRatio/tailwind/index.vue'
import AvatarDemo from './demo/Avatar/tailwind/index.vue'
import CheckboxDemo from './demo/Checkbox/tailwind/index.vue'
import CollapsibleDemo from './demo/Collapsible/tailwind/index.vue'
import ContextMenuDemo from './demo/ContextMenu/tailwind/index.vue'
import DialogDemo from './demo/Dialog/tailwind/index.vue'
import DropdownMenuDemo from './demo/DropdownMenu/tailwind/index.vue'
import HoverCardDemo from './demo/HoverCard/tailwind/index.vue'
import LabelDemo from './demo/Label/tailwind/index.vue'
import MenubarDemo from './demo/Menubar/tailwind/index.vue'
import PopoverDemo from './demo/Popover/tailwind/index.vue'
import ProgressDemo from './demo/Progress/tailwind/index.vue'
import RadioGroupDemo from './demo/RadioGroup/tailwind/index.vue'
import ScrollAreaDemo from './demo/ScrollArea/tailwind/index.vue'
import SliderDemo from './demo/Slider/tailwind/index.vue'
import SwitchDemo from './demo/Switch/tailwind/index.vue'
import TabsDemo from './demo/Tabs/tailwind/index.vue'
import ToastDemo from './demo/Toast/tailwind/index.vue'
import ToggleDemo from './demo/Toggle/tailwind/index.vue'
import ToggleGroupDemo from './demo/ToggleGroup/tailwind/index.vue'
import ToolbarDemo from './demo/Toolbar/tailwind/index.vue'
import TooltipDemo from './demo/Tooltip/tailwind/index.vue'

import DemoContainer from './DemoContainer.vue'
</script>

<template>
  <div>
    <DemoContainer title="accordion">
      <AccordionDemo />
    </DemoContainer>
    <DemoContainer title="alert dialog">
      <AlertDialogDemo />
    </DemoContainer>
    <DemoContainer title="aspect ratio">
      <AspectRatioDemo />
    </DemoContainer>
    <DemoContainer title="avatar">
      <AvatarDemo />
    </DemoContainer>
    <DemoContainer title="checkbox">
      <CheckboxDemo />
    </DemoContainer>
    <DemoContainer title="collapsible">
      <CollapsibleDemo />
    </DemoContainer>
    <DemoContainer title="context menu">
      <ContextMenuDemo />
    </DemoContainer>
    <DemoContainer title="dialog">
      <DialogDemo />
    </DemoContainer>
    <DemoContainer title="dropdown menu">
      <DropdownMenuDemo />
    </DemoContainer>
    <DemoContainer title="hover card">
      <HoverCardDemo />
    </DemoContainer>
    <DemoContainer title="label">
      <LabelDemo />
    </DemoContainer>
    <DemoContainer title="menubar">
      <MenubarDemo />
    </DemoContainer>
    <DemoContainer title="popover">
      <PopoverDemo />
    </DemoContainer>
    <DemoContainer title="progress">
      <ProgressDemo />
    </DemoContainer>
    <DemoContainer title="radio group">
      <RadioGroupDemo />
    </DemoContainer>
    <DemoContainer title="scroll area">
      <ScrollAreaDemo />
    </DemoContainer>
    <DemoContainer title="slider">
      <SliderDemo />
    </DemoContainer>
    <DemoContainer title="switch">
      <SwitchDemo />
    </DemoContainer>
    <DemoContainer title="tabs">
      <TabsDemo />
    </DemoContainer>
    <DemoContainer title="toast">
      <ToastDemo />
    </DemoContainer>
    <DemoContainer title="toggle">
      <ToggleDemo />
    </DemoContainer>
    <DemoContainer title="toggle group">
      <ToggleGroupDemo />
    </DemoContainer>
    <DemoContainer
      title="toolbar"
      overflow
    >
      <ToolbarDemo />
    </DemoContainer>
    <DemoContainer title="tooltip">
      <TooltipDemo />
    </DemoContainer>
  </div>
</template>
