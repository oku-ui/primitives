<script setup lang="ts">
import { OkuDialog, OkuDialogClose, OkuDialogContent, OkuDialogDescription, OkuDialogOverlay, OkuDialogPortal, OkuDialogTitle, OkuDialogTrigger } from '@oku-ui/dialog'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div>
    <OkuDialog v-model="open">
      <OkuDialogTrigger class="dialog-trigger">
        open
      </OkuDialogTrigger>
      <OkuDialogPortal>
        <OkuDialogOverlay class="dialog-overlay" />
        <OkuDialogContent class="dialog-contentDefault">
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
                <input id="firstName" type="text" placeholder="John">
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
        </OkuDialogContent>
      </OkuDialogPortal>
    </okudialog>
    <div style="margin-top: 20px;">
      <p>These elements can't be focused when the dialog is opened.</p>
      <div style="margin-top: 15px;">
        <button type="button">
          A button
        </button>
        <input type="text" placeholder="Another focusable element">
      </div>
    </div>
  </div>
</template>
