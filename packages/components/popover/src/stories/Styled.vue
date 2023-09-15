<script setup lang="ts">
import {
  OkuPopover,
  OkuPopoverArrow,
  OkuPopoverClose,
  OkuPopoverContent,
  OkuPopoverPortal,
  OkuPopoverTrigger,
} from '@oku-ui/popover'
</script>

<!-- <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200vh' }}
    >
      <Popover.Root>
        <Popover.Trigger className={triggerClass()}>open</Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className={contentClass()} sideOffset={5}>
            <Popover.Close className={closeClass()}>close</Popover.Close>
            <Popover.Arrow className={arrowClass()} width={20} height={10} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <input />
    </div> -->

<template>
  <div
    :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '200vh',
    }"
  >
    <OkuPopover>
      <OkuPopoverTrigger class="triggerClass">
        open
      </OkuPopoverTrigger>
      <OkuPopoverPortal>
        <OkuPopoverContent class="contentClass" :side-offset="5">
          <OkuPopoverClose class="closeClass">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow class="arrowClass" :width="20" :height="10" />
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>

    <input>
  </div>
</template>
