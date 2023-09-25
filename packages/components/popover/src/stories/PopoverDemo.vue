<script setup lang="ts">
import {
  OkuPopover,
  OkuPopoverArrow,
  OkuPopoverClose,
  OkuPopoverContent,
  OkuPopoverPortal,
  OkuPopoverTrigger,
} from '@oku-ui/popover'

export interface OkuPopoverProps {
  template: '#1' | '#2'
  allshow?: boolean
}

withDefaults(defineProps<OkuPopoverProps>(), {
  template: '#1',
})
</script>

<template>
  <div v-if="template === '#1' || allshow" class="flex flex-col">
    <div>
      <OkuPopover>
        <OkuPopoverTrigger class="popover-trigger">
          open
        </OkuPopoverTrigger>
        <OkuPopoverPortal>
          <OkuPopoverContent class="popover-content" :side-offset="15">
            <OkuPopoverClose class="popover-close">
              close
            </OkuPopoverClose>
            <OkuPopoverArrow class="popover-arrow" :width="20" :height="10" />
          </OkuPopoverContent>
        </OkuPopoverPortal>
      </OkuPopover>
    </div>
  </div>
</template>

<style>
.popover-trigger {

}

.popover-content {
  transform-origin: var(--oku-popover-content-transform-origin);
  background-color: #e5e7eb;
  padding: 20px;
  border-radius: 5px;
}
.popover-close {
}

.popover-arrow {
  fill: #e5e7eb;
}

@keyframes popover-fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes popover-fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.popover-animatedContent {
   transform-origin: var(--oku-popover-content-transform-origin);
  background-color: #e5e7eb;
  padding: 20px;
  border-radius: 5px;

  & [data-state='open'] {
    animation: popover-fadeIn 300ms ease-out;
  }
  & [data-state='closed'] {
    animation: popover-fadeOut 300ms ease-in;
  }
}

.popover-grid {
  display: inline-grid;
  grid-template-columns: repeat(3, 50px);
  column-gap: 150px;
  row-gap: 100px;
  padding: 100px;
  border: 1px solid black;
}

.popover-chromaticTrigger {
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  background-color: tomato;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.popover-chromaticContent {
  box-sizing: border-box;
  display: grid;
  place-content: center;
  width: 60px;
  height: 60px;
  background-color: royalblue;
  color: white;
  font-size: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.popover-chromaticArrow {
  fill: black;
}

.popover-triggerAttr {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state='closed'] {
    border-color: red;
  }
  &[data-state='open'] {
    border-color: green;
  }
}

.popover-contentAttr {
  transform-origin: var(--oku-popover-content-transform-origin);
  background-color: #e5e7eb;
  padding: 20px;
  border-radius: 5px;
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state='closed'] {
    border-color: red;
  }
  &[data-state='open'] {
    border-color: green;
  }
}

.popover-arrowAttr {
  fill: #e5e7eb;
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state='closed'] {
    border-color: red;
  }
  &[data-state='open'] {
    border-color: green;
  }
}

.popover-closeAttr {
  background-color: rgba(0, 0, 255, 0.3);
  border: 2px solid blue;
  padding: 10px;

  &[data-state='closed'] {
    border-color: red;
  }
  &[data-state='open'] {
    border-color: green;
  }
}
</style>
