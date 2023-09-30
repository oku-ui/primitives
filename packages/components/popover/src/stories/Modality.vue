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

<template>
  <div
    :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '110vh',
    }"
  >
    <div :style="{ display: 'grid', gap: 50 }">
      <div
        :style="{
          display: 'inline-flex',
          alignItems: 'center',
          flexDirection: 'column',
        }"
      >
        <h1>Non modal (default)</h1>
        <OkuPopover>
          <OkuPopoverTrigger class="popover-trigger">
            open
          </OkuPopoverTrigger>
          <OkuPopoverPortal>
            <OkuPopoverContent
              class="popover-content"
              :side-offset="5"
            >
              <OkuPopoverClose class="popover-close">
                close
              </OkuPopoverClose>
              <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" :offset="10" />
            </OkuPopoverContent>
          </OkuPopoverPortal>
        </OkuPopover>
        <textarea
          style="width: 500px; height: 100px; margin-top: 10px"
          defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet."
        />
      </div>
      <div
        :style="{
          display: 'inline-flex',
          alignItems: 'center',
          flexDirection: 'column',
        }"
      >
        <h1>Modal</h1>
        <OkuPopover modal>
          <OkuPopoverTrigger class="popover-trigger">
            open
          </OkuPopoverTrigger>
          <OkuPopoverPortal>
            <OkuPopoverContent
              class="popover-content"
              :side-offset="5"
            >
              <OkuPopoverClose class="popover-close">
                close
              </OkuPopoverClose>
              <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" :offset="10" />
            </OkuPopoverContent>
          </OkuPopoverPortal>
        </OkuPopover>
        <textarea
          style="width: 500px; height: 100px; margin-top: 10px"
          defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet."
        />
      </div>
    </div>
  </div>
</template>
