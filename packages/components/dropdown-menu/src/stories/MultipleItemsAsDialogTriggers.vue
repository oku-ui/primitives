<script setup lang="ts">
import { ref } from 'vue'
import { OkuDropdownMenu, OkuDropdownMenuArrow, OkuDropdownMenuContent, OkuDropdownMenuItem, OkuDropdownMenuPortal, OkuDropdownMenuTrigger } from '@oku-ui/dropdown-menu'
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'

const deleteOpen = ref(false)
const switchAccountsOpen = ref(false)
const deleteOpen2 = ref(false)
const switchAccountsOpen2 = ref(false)
const dropdownTriggerRef = ref<HTMLButtonElement | null>(null)
const dropdownTriggerRef2 = ref<HTMLButtonElement | null>(null)
</script>

<template>
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
    <OkuDialog
      @open-change="(open) => {
        if (!open) {
          deleteOpen = false
          switchAccountsOpen = false
        }
      }"
    >
      <OkuDropdownMenu>
        <OkuDropdownMenuTrigger ref="dropdownTriggerRef" class="dropdown-menu-trigger">
          Open
        </OkuDropdownMenuTrigger>

        <OkuDropdownMenuPortal>
          <OkuDropdownMenuContent class="dropdown-menu-content" :side-offset="5">
            <OkuDialogTrigger as-child class="dropdown-menu-item">
              <OkuDropdownMenuItem @select="switchAccountsOpen = true">
                Switch Accounts
              </OkuDropdownMenuItem>
            </OkuDialogTrigger>
            <OkuDialogTrigger as-child class="dropdown-menu-item">
              <OkuDropdownMenuItem
                @select="deleteOpen = true"
              >
                Delete
              </OkuDropdownMenuItem>
            </OkuDialogTrigger>
            <OkuDropdownMenuArrow />
          </OkuDropdownMenuContent>
        </OkuDropdownMenuPortal>
      </OkuDropdownMenu>

      <OkuDialogContent
        class="dropdown-menu-dialog"
        @close-auto-focus="(event) => {
          // focus dropdown trigger for accessibility so user doesn't lose their place in the document
          dropdownTriggerRef?.focus()
          event.preventDefault()
        }"
      >
        <OkuDialogTitle v-if="switchAccountsOpen">
          Switch accounts
        </OkuDialogTitle>
        <OkuDialogTitle v-if="deleteOpen">
          Are you sure?
        </OkuDialogTitle>
        <OkuDialogClose>Close</OkuDialogClose>
      </OkuDialogContent>
    </OkuDialog>

    <h1>Non-modal</h1>
    <OkuDialog
      :modal="false"
      @open-change="(open) => {
        if (!open) {
          deleteOpen2 = false
          switchAccountsOpen2 = false
        }
      }"
    >
      <OkuDropdownMenu :modal="false">
        <OkuDropdownMenuTrigger ref="dropdownTriggerRef2" class="dropdown-menu-trigger">
          Open
        </OkuDropdownMenuTrigger>

        <OkuDropdownMenuPortal>
          <OkuDropdownMenuContent
            class="dropdown-menu-content"
            :side-offset="5"
            @close-auto-focus="(event) => {
              // prevent focusing dropdown trigger when it closes from a dialog trigger
              if (deleteOpen2 || switchAccountsOpen2)
                event.preventDefault()
            }"
          >
            <OkuDialogTrigger as-child class="dropdown-menu-item">
              <OkuDropdownMenuItem @select="switchAccountsOpen2 = true">
                Switch Accounts
              </OkuDropdownMenuItem>
            </OkuDialogTrigger>
            <OkuDialogTrigger as-child class="dropdown-menu-item">
              <OkuDropdownMenuItem @select="deleteOpen2 = true">
                Delete
              </OkuDropdownMenuItem>
            </OkuDialogTrigger>
            <OkuDropdownMenuArrow />
          </OkuDropdownMenuContent>
        </OkuDropdownMenuPortal>
      </OkuDropdownMenu>

      <OkuDialogContent
        class="dropdown-menu-dialog"
        @close-auto-focus="(event) => {
          // focus dropdown trigger for accessibility so user doesn't lose their place in the document
          dropdownTriggerRef2?.focus()
          event.preventDefault()
        }"
      >
        <OkuDialogTitle v-if="switchAccountsOpen2">
          Switch accounts
        </OkuDialogTitle>
        <OkuDialogTitle v-if="deleteOpen2">
          Are you sure?
        </OkuDialogTitle>
        <OkuDialogClose>Close</OkuDialogClose>
      </OkuDialogContent>
    </OkuDialog>
  </div>
</template>
