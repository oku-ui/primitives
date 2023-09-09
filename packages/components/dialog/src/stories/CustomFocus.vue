<script setup lang="ts">
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
import { ref } from 'vue'

const open = ref(false)

const firstNameRef = ref<HTMLInputElement | null>(null)
const searchFieldRef = ref<HTMLInputElement | null>
(null)

function onOpenAutoFocus(event: any) {
  console.log('onOpenAutoFocus')
  event.preventDefault()

  firstNameRef.value?.focus()
}
function onCloseAutoFocus(event: any) {
  console.log('onCloseAutoFocus')
  event.preventDefault()
  searchFieldRef.value?.focus()
}
</script>

<template>
  <div>
    <OkuDialog v-model="open">
      <OkuDialogTrigger class="triggerClass">
        open
      </OkuDialogTrigger>
      <OkuDialogPortal>
        <OkuDialogOverlay class="overlayClass" />
        <OkuDialogContent
          class="contentDefaultClass"
          @open-auto-focus="onOpenAutoFocus"
          @close-auto-focus="onCloseAutoFocus"
        >
          <OkuDialogClose>
            close
          </OkuDialogClose>
          <OkuDialogTitle>
            Title
          </OkuDialogTitle>
          <OkuDialogDescription>
            Description
          </OkuDialogDescription>
          <table style="margin-top: 20px;">
            <tr>
              <td>
                <label htmlFor="firstName">First Name</label>
                <input ref="firstNameRef" type="text" placeholder="John">
              </td>
              <td>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" placeholder="Doe">
              </td>
              <td>
                <button type="submit">
                  Send
                </button>
              </td>
            </tr>
          </table>
        </okudialogcontent>
      </okudialogportal>
    </okudialog>
    <div style="margin-top: 20px;">
      <p>These elements can't be focused when the dialog is opened.</p>
      <div style="margin-top: 15px;">
        <button type="button">
          A button
        </button>
        <input ref="searchFieldRef" type="text" placeholder="Another focusable element">
      </div>
    </div>
  </div>
</template>
