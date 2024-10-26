<script setup lang="ts">
import { shallowRef } from 'vue'
import { PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from '../index.ts'
import './styles.css'

const buttonRef = shallowRef<any>()

function focusButton() {
  buttonRef.value?.$el?.focus()
}
</script>

<template>
  <div
    :style="{
      minHeight: '600px',
      minWidth: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }"
  >
    <button
      type="button"
      :style="{ position: 'fixed', top: '10px', left: '10px' }"
      @click="focusButton"
    >
      Focus popover button
    </button>

    <PopoverRoot>
      <PopoverTrigger ref="buttonRef" class="popover_triggerClass">
        Open popover
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          class="popover_contentClass"
          :side-offset="5"
          :style="{ backgroundColor: 'crimson' }"
        >
          <PopoverRoot>
            <PopoverTrigger class="popover_triggerClass">
              Open nested popover
            </PopoverTrigger>
            <PopoverPortal>
              <PopoverContent
                class="popover_contentClass"
                side="top"
                align="center"
                :side-offset="5"
                :style="{ backgroundColor: 'green' }"
              >
                <PopoverClose class="popover_closeClass">
                  close
                </PopoverClose>
                <PopoverArrow
                  class="popover_arrowClass"
                  :width="20"
                  :height="10"
                  :offset="20"
                  :style="{ fill: 'green' }"
                />
              </PopoverContent>
            </PopoverPortal>
          </PopoverRoot>

          <PopoverClose
            class="popover_closeClass"
            :style="{ marginLeft: '10px' }"
          >
            close
          </PopoverClose>
          <PopoverArrow
            class="popover_arrowClass"
            :width="20"
            :height="10"
            :offset="20"
            :style="{ fill: 'crimson' }"
          />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>
