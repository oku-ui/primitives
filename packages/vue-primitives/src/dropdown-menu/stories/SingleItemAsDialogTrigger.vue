<script setup lang="ts">
import { DialogClose, DialogContent, DialogRoot, DialogTitle, DialogTrigger } from '../../dialog/index.ts'
import { useForwardElement, useRef } from '../../hooks/index.ts'
import { DropdownMenuArrow, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuRoot, DropdownMenuTrigger } from '../index.ts'
import './style.css'
import '../../menu/stories/styles.css'

const dropdownTriggerRef = useRef<HTMLElement>()
const setDropdownTriggerRef = useForwardElement(dropdownTriggerRef)
const dropdownTriggerRef2 = useRef<HTMLElement>()
const setDropdownTriggerRef2 = useForwardElement(dropdownTriggerRef2)
const isDialogOpenRef = useRef(false)

function handleModalDialogClose(event: Event) {
  // focus dropdown trigger for accessibility so user doesn't lose their place in the document
  dropdownTriggerRef.current?.focus()
  event.preventDefault()
}

function handleNonModalDialogClose(event: Event) {
  // focus dropdown trigger for accessibility so user doesn't lose their place in the document
  dropdownTriggerRef2.current?.focus()
  event.preventDefault()
  isDialogOpenRef.current = false
}
</script>

<template>
  <div>
    <div
      :style="{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }"
    >
      <h1>Modal</h1>
      <DialogRoot>
        <DropdownMenuRoot>
          <DropdownMenuTrigger :ref="setDropdownTriggerRef" class="dropdownMenu_triggerClass">
            Open
          </DropdownMenuTrigger>

          <DropdownMenuPortal>
            <DropdownMenuContent class="menu_contentClass" :side-offset="5">
              <DialogTrigger class="menu_itemClass" as="template">
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem class="menu_itemClass">
                Test
              </DropdownMenuItem>
              <DropdownMenuArrow />
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenuRoot>

        <DialogContent class="dropdownMenu_dialogClass" @close-auto-focus="handleModalDialogClose">
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </DialogRoot>

      <h1>Non-modal</h1>
      <DialogRoot :modal="false">
        <DropdownMenuRoot :modal="false">
          <DropdownMenuTrigger :ref="setDropdownTriggerRef2" class="dropdownMenu_triggerClass">
            Open
          </DropdownMenuTrigger>

          <DropdownMenuPortal>
            <DropdownMenuContent
              class="menu_contentClass"
              :side-offset="5"
              @close-auto-focus="(event) => {
                // prevent focusing dropdown trigger when it closes from a dialog trigger
                if (isDialogOpenRef.current) event.preventDefault();
              }"
            >
              <DialogTrigger class="menu_itemClass" as="template">
                <DropdownMenuItem @select="() => (isDialogOpenRef.current = true)">
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem class="menu_itemClass">
                Test
              </DropdownMenuItem>
              <DropdownMenuArrow />
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenuRoot>

        <DialogContent class="dropdownMenu_dialogClass" @close-auto-focus="handleNonModalDialogClose">
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogClose>Close</DialogClose>`
        </DialogContent>
      </DialogRoot>
    </div>
  </div>
</template>
