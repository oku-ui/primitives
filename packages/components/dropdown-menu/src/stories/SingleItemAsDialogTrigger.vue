<script setup lang="ts">
import { ref } from 'vue'
import { OkuDropdownMenu, OkuDropdownMenuArrow, OkuDropdownMenuContent, OkuDropdownMenuItem, OkuDropdownMenuPortal, OkuDropdownMenuTrigger } from '@oku-ui/dropdown-menu'
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'

const dropdownTriggerRef = ref<HTMLButtonElement | null>(null)
const dropdownTriggerRef2 = ref<HTMLButtonElement | null>(null)
const isDialogOpenRef = ref(false)

function handleModalDialogClose(event: Event) {
  // focus dropdown trigger for accessibility so user doesn't lose their place in the document
  dropdownTriggerRef.value?.focus()
  event.preventDefault()
}

function handleNonModalDialogClose(event: Event) {
  // focus dropdown trigger for accessibility so user doesn't lose their place in the document
  dropdownTriggerRef2.value?.focus()
  event.preventDefault()
  isDialogOpenRef.value = false
}
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
    <OkuDialog>
      <OkuDropdownMenu>
        <OkuDropdownMenuTrigger ref="dropdownTriggerRef" class="drop-menu-trigger">
          Open
        </OkuDropdownMenuTrigger>

        <OkuDropdownMenuPortal>
          <OkuDropdownMenuContent class="drop-menu-content" :side-offset="5">
            <OkuDialogTrigger class="drop-menu-item" as-child>
              <OkuDropdownMenuItem>Delete</OkuDropdownMenuItem>
            </OkuDialogTrigger>
            <OkuDropdownMenuItem class="drop-menu-item">
              Test
            </OkuDropdownMenuItem>
            <OkuDropdownMenuArrow />
          </OkuDropdownMenuContent>
        </OkuDropdownMenuPortal>
      </OkuDropdownMenu>

      <OkuDialogContent class="drop-menu-dialog" @close-auto-focus="handleModalDialogClose">
        <OkuDialogTitle>Are you sure?</OkuDialogTitle>
        <OkuDialogClose>Close</OkuDialogClose>
      </OkuDialogContent>
    </OkuDialog>

    <h1>Non-modal</h1>
    <OkuDialog :modal="false">
      <OkuDropdownMenu :modal="false">
        <OkuDropdownMenuTrigger ref="dropdownTriggerRef2" class="drop-menu-trigger">
          Open
        </OkuDropdownMenuTrigger>

        <OkuDropdownMenuPortal>
          <OkuDropdownMenuContent
            class="drop-menu-content"
            :side-offset="5"
            @close-auto-focus="(event) => {
              // prevent focusing dropdown trigger when it closes from a dialog trigger
              if (isDialogOpenRef)
                event.preventDefault()
            }"
          >
            <OkuDialogTrigger class="drop-menu-item" as-child>
              <OkuDropdownMenuItem @select="isDialogOpenRef = true">
                Delete
              </OkuDropdownMenuItem>
            </OkuDialogTrigger>
            <OkuDropdownMenuItem class="drop-menu-item">
              Test
            </OkuDropdownMenuItem>
            <OkuDropdownMenuArrow />
          </OkuDropdownMenuContent>
        </OkuDropdownMenuPortal>
      </OkuDropdownMenu>

      <OkuDialogContent class="drop-menu-dialog" @close-auto-focus="handleNonModalDialogClose">
        <OkuDialogTitle>Are you sure?</OkuDialogTitle>
        <OkuDialogClose>Close</OkuDialogClose>`
      </OkuDialogContent>
    </OkuDialog>
  </div>
</template>
