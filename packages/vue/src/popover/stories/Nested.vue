<script setup lang="ts">
import {
  OkuPopover,
  OkuPopoverArrow,
  OkuPopoverClose,
  OkuPopoverContent,
  OkuPopoverPortal,
  OkuPopoverTrigger,
} from '@oku-ui/popover'
import { ref } from 'vue'

const buttonRef = ref<HTMLButtonElement | null>(null)
</script>

<template>
  <div
    :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '300vh',
      width: '300vw',
    }"
  >
    <button
      type="button"
      :style="{
        position: 'fixed',
        top: '10px',
        left: '10px',
      }"
      @click="() => buttonRef?.focus()"
    >
      Focus popover button
    </button>

    <OkuPopover>
      <OkuPopoverTrigger ref="buttonRef" class="popover-trigger">
        Open popover
      </OkuPopoverTrigger>

      <OkuPopoverPortal>
        <OkuPopoverContent
          class="popover-content"
          :side-offset="5"
          :style="{
            backgroundColor: 'crimson',
          }"
        >
          <OkuPopover>
            <OkuPopoverTrigger class="popover-trigger">
              Open nested popover
            </OkuPopoverTrigger>
            <OkuPopoverPortal>
              <OkuPopoverContent
                class="popover-content"
                :side-offset="5"
                side="top"
                align="center"
                :style="{
                  backgroundColor: 'green',
                }"
              >
                <OkuPopoverClose class="popover-close">
                  close
                </OkuPopoverClose>
                <OkuPopoverArrow
                  class="popover-arrow"
                  :width="20"
                  :height="10"
                  :offset="20"
                  :style="{
                    fill: 'green',
                  }"
                />
              </OkuPopoverContent>
            </OkuPopoverPortal>
          </OkuPopover>

          <OkuPopoverClose class="popover-close" :style="{ marginLeft: 10 }">
            close
          </OkuPopoverClose>
          <OkuPopoverArrow
            class="popover-arrow"
            :width="20"
            :height="10"
            :offset="20"
            :style="{
              fill: 'crimson',
            }"
          />
        </OkuPopoverContent>
      </OkuPopoverPortal>
    </OkuPopover>
  </div>
</template>
