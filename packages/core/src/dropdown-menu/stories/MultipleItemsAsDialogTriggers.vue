<script setup lang="ts">
import { shallowRef } from 'vue'
import { DialogClose, DialogContent, DialogRoot, DialogTitle, DialogTrigger } from '../../dialog/index.ts'
import { useForwardElement, useRef } from '../../hooks/index.ts'
import { DropdownMenuArrow, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuRoot, DropdownMenuTrigger } from '../index.ts'
import './style.css'
import '../../menu/stories/styles.css'

const dropdownTriggerRef = useRef<HTMLElement>()
const setDropdownTriggerRef = useForwardElement(dropdownTriggerRef)
const dropdownTriggerRef2 = useRef<HTMLElement>()
const setDropdownTriggerRef2 = useForwardElement(dropdownTriggerRef2)

const deleteOpen = shallowRef(false)
const switchAccountsOpen = shallowRef(false)
const deleteOpen2 = shallowRef(false)
const switchAccountsOpen2 = shallowRef(false)

function setDeleteOpen(value: boolean) {
  deleteOpen.value = value
}

function setSwitchAccountsOpen(value: boolean) {
  switchAccountsOpen.value = value
}

function setDeleteOpen2(value: boolean) {
  deleteOpen2.value = value
}

function setSwitchAccountsOpen2(value: boolean) {
  switchAccountsOpen2.value = value
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
        height: '600px',
      }"
    >
      <h1>Modal</h1>
      <DialogRoot
        @update:open="(open) => {
          if (!open) {
            setDeleteOpen(false);
            setSwitchAccountsOpen(false);
          }
        }"
      >
        <DropdownMenuRoot>
          <DropdownMenuTrigger :ref="setDropdownTriggerRef" class="dropdownMenu_triggerClass">
            Open
          </DropdownMenuTrigger>

          <DropdownMenuPortal>
            <DropdownMenuContent class="menu_contentClass" :side-offset="5">
              <DialogTrigger as="template" class="menu_itemClass">
                <DropdownMenuItem @select="setSwitchAccountsOpen(true)">
                  Switch Accounts
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger as="template" class="menu_itemClass">
                <DropdownMenuItem @select="setDeleteOpen(true)">
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuArrow />
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenuRoot>

        <DialogContent
          class="dropdownMenu_dialogClass"
          @close-auto-focus="(event) => {
            // focus dropdown trigger for accessibility so user doesn't lose their place in the document
            dropdownTriggerRef.value?.focus();
            event.preventDefault();
          }"
        >
          <DialogTitle v-if="switchAccountsOpen">
            Switch accounts
          </DialogTitle>
          <DialogTitle v-if="deleteOpen">
            Are you sure?
          </DialogTitle>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </DialogRoot>

      <h1>Non-modal</h1>
      <DialogRoot
        :modal="false"
        @update:open="(open) => {
          if (!open) {
            setDeleteOpen2(false);
            setSwitchAccountsOpen2(false);
          }
        }"
      >
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
                if (deleteOpen2 || switchAccountsOpen2) event.preventDefault();
              }"
            >
              <DialogTrigger as="template" class="menu_itemClass">
                <DropdownMenuItem @select="setSwitchAccountsOpen2(true)">
                  Switch Accounts
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger as="template" class="menu_itemClass">
                <DropdownMenuItem @select="setDeleteOpen2(true)">
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuArrow />
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenuRoot>

        <DialogContent
          class="dropdownMenu_dialogClass"
          @close-auto-focus="(event) => {
            // focus dropdown trigger for accessibility so user doesn't lose their place in the document
            dropdownTriggerRef2.value?.focus();
            event.preventDefault();
          }"
        >
          <DialogTitle v-if="switchAccountsOpen2">
            Switch accounts
          </DialogTitle>
          <DialogTitle v-if="deleteOpen2">
            Are you sure?
          </DialogTitle>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </DialogRoot>
    </div>
  </div>
</template>
