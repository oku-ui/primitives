<script setup lang="ts">
import { shallowRef } from 'vue'

import { ToastAction, ToastDescription, ToastRoot, ToastTitle, ToastViewport } from '../index.ts'
import ToastClose from '../ToastClose.vue'
import ToastProvider from './ToastProvider.vue'

const open = shallowRef(true)
const SNAPSHOT_DELAY = 300
</script>

<template>
  <div>
    <h1>Order</h1>
    <ToastProvider :duration="Infinity">
      <ToastRoot class="toast_rootClass">
        <div class="toast_headerClass">
          <ToastTitle class="toast_titleClass">
            Toast 1
          </ToastTitle>
          <ToastClose class="toast_closeClass">
            ×
          </ToastClose>
        </div>
        <ToastDescription class="toast_descriptionClass">
          Description
        </ToastDescription>
        <ToastAction alt-text="alternative" class="toast_buttonClass" :style="{ marginTop: '10px' }">
          Action
        </ToastAction>
      </ToastRoot>
      <ToastRoot class="toast_rootClass">
        <div class="toast_headerClass">
          <ToastTitle class="toast_titleClass">
            Toast 2
          </ToastTitle>
          <ToastClose class="toast_closeClass">
            ×
          </ToastClose>
        </div>
        <ToastDescription class="toast_descriptionClass">
          Description
        </ToastDescription>
        <ToastAction alt-text="alternative" class="toast_buttonClass" :style="{ marginTop: '10px' }">
          Action
        </ToastAction>
      </ToastRoot>
      <ToastViewport class="toast_chromaticViewport" />
    </ToastProvider>

    <h1>Uncontrolled</h1>

    <h2>Open</h2>
    <ToastProvider>
      <ToastRoot :duration="Infinity" class="toast_rootClass">
        <div class="toast_headerClass">
          <ToastTitle class="toast_titleClass">
            Toast
          </ToastTitle>
          <ToastClose class="toast_closeClass">
            ×
          </ToastClose>
        </div>
        <ToastDescription class="toast_descriptionClass">
          Description
        </ToastDescription>
        <ToastAction alt-text="alternative" class="toast_buttonClass" :style="{ marginTop: '10px' }">
          Action
        </ToastAction>
      </ToastRoot>
      <ToastViewport class="toast_chromaticViewport" />
    </ToastProvider>

    <h2>Closed</h2>
    <ToastProvider>
      <ToastRoot :default-open="false" :duration="Infinity" class="toast_rootClass">
        <div class="toast_headerClass">
          <ToastTitle class="toast_titleClass">
            Title
          </ToastTitle>
          <ToastClose class="toast_closeClass">
            ×
          </ToastClose>
        </div>
        <ToastDescription class="toast_descriptionClass">
          Uncontrolled foreground closed
        </ToastDescription>
        <ToastAction alt-text="alternative" class="toast_buttonClass" :style="{ marginTop: '10px' }">
          Action
        </ToastAction>
      </ToastRoot>
      <ToastViewport class="toast_chromaticViewport" />
    </ToastProvider>

    <h1>Controlled</h1>

    <h2>Open</h2>
    <ToastProvider>
      <ToastRoot open :duration="Infinity" class="toast_rootClass">
        <div class="toast_headerClass">
          <ToastTitle class="toast_titleClass">
            Toast
          </ToastTitle>
          <ToastClose class="toast_closeClass">
            ×
          </ToastClose>
        </div>
        <ToastDescription class="toast_descriptionClass">
          Description
        </ToastDescription>
        <ToastAction alt-text="alternative" class="toast_buttonClass" :style="{ marginTop: '10px' }">
          Action
        </ToastAction>
      </ToastRoot>
      <ToastViewport class="toast_chromaticViewport" />
    </ToastProvider>

    <h2>Closed</h2>
    <ToastProvider>
      <ToastRoot :open="false" :duration="Infinity" class="toast_rootClass">
        <div class="toast_headerClass">
          <ToastTitle class="toast_titleClass">
            Toast
          </ToastTitle>
          <ToastClose class="toast_closeClass">
            ×
          </ToastClose>
        </div>
        <ToastDescription class="toast_descriptionClass">
          Description
        </ToastDescription>
        <ToastAction alt-text="alternative" class="toast_buttonClass" :style="{ marginTop: '10px' }">
          Action
        </ToastAction>
      </ToastRoot>
      <ToastViewport class="toast_chromaticViewport" />
    </ToastProvider>

    <h1>Dismissed</h1>
    <h2>Uncontrolled</h2>
    <ToastProvider>
      <ToastRoot :duration="SNAPSHOT_DELAY - 100" class="toast_rootClass">
        <div class="toast_headerClass">
          <ToastTitle class="toast_titleClass">
            Toast
          </ToastTitle>
          <ToastClose class="toast_closeClass">
            ×
          </ToastClose>
        </div>
        <ToastDescription class="toast_descriptionClass">
          Description
        </ToastDescription>
        <ToastAction alt-text="alternative" class="toast_buttonClass" :style="{ marginTop: '10px' }">
          Action
        </ToastAction>
      </ToastRoot>
      <ToastViewport class="toast_chromaticViewport" />
    </ToastProvider>

    <h2>Controlled</h2>
    <ToastProvider>
      <ToastRoot
        v-model:open="open"
        :duration="SNAPSHOT_DELAY - 100"
        class="toast_rootClass"
      >
        <div class="toast_headerClass">
          <ToastTitle class="toast_titleClass">
            Toast
          </ToastTitle>
          <ToastClose class="toast_closeClass">
            ×
          </ToastClose>
        </div>
        <ToastDescription class="toast_descriptionClass">
          Description
        </ToastDescription>
        <ToastAction alt-text="alternative" class="toast_buttonClass" :style="{ marginTop: '10px' }">
          Action
        </ToastAction>
      </ToastRoot>
      <ToastViewport class="toast_chromaticViewport" />
    </ToastProvider>

    <h1>Provider</h1>
    <h2>Duration</h2>
    <ToastProvider :duration="SNAPSHOT_DELAY - 100">
      <ToastRoot class="toast_rootClass">
        <div class="toast_headerClass">
          <ToastTitle class="toast_titleClass">
            Toast
          </ToastTitle>
          <ToastClose class="toast_closeClass">
            ×
          </ToastClose>
        </div>
        <ToastDescription class="toast_descriptionClass">
          Description
        </ToastDescription>
        <ToastAction alt-text="alternative" class="toast_buttonClass" :style="{ marginTop: '10px' }">
          Action
        </ToastAction>
      </ToastRoot>
      <ToastViewport class="toast_chromaticViewport" />
    </ToastProvider>

    <h2>Duration overridden</h2>
    <ToastProvider :duration="Infinity">
      <ToastRoot :duration="SNAPSHOT_DELAY - 100" class="toast_rootClass">
        <div class="toast_headerClass">
          <ToastTitle class="toast_titleClass">
            Toast
          </ToastTitle>
          <ToastClose class="toast_closeClass">
            ×
          </ToastClose>
        </div>
        <ToastDescription class="toast_descriptionClass">
          Description
        </ToastDescription>
        <ToastAction alt-text="alternative" class="toast_buttonClass" :style="{ marginTop: '10px' }">
          Action
        </ToastAction>
      </ToastRoot>
      <ToastViewport class="toast_chromaticViewport" />
    </ToastProvider>
  </div>
</template>
