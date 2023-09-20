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
        <OkuPopoverTrigger class="popover_triggerClass">
          open
        </OkuPopoverTrigger>
        <OkuPopoverPortal>
          <OkuPopoverContent class="popover_contentClass" :side-offset="15">
            <OkuPopoverClose class="popover_closeClass">
              close
            </OkuPopoverClose>
            <OkuPopoverArrow class="popover_arrowClass" :width="20" :height="10" />
          </OkuPopoverContent>
        </OkuPopoverPortal>
      </OkuPopover>
    </div>
  </div>
</template>

<style>
.popover_triggerClass {

}

.popover_contentClass {
  transform-origin: var(--oku-popover-content-transform-origin);
  background-color: #e5e7eb;
  padding: 20px;
  border-radius: 5px;
}
.popover_closeClass {
}

.popover_arrowClass {
  fill: #e5e7eb;
}

@keyframes popover_fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes popover_fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.popover_animatedContentClass {
   transform-origin: var(--oku-popover-content-transform-origin);
  background-color: #e5e7eb;
  padding: 20px;
  border-radius: 5px;

  & [data-state='open'] {
    animation: popover_fadeIn 300ms ease-out;
  }
  & [data-state='closed'] {
    animation: popover_fadeOut 300ms ease-in;
  }
}

.popover_gridClass {
  display: inline-grid;
  grid-template-columns: repeat(3, 50px);
  column-gap: 150px;
  row-gap: 100px;
  padding: 100px;
  border: 1px solid black;
}

.popover_chromaticTriggerClass {
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  background-color: tomato;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.popover_chromaticContentClass {
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

.popover_chromaticArrowClass {
  fill: black;
}

.popover_triggerAttrClass {
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

.popover_contentAttrClass {
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

.popover_arrowAttrClass {
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

.popover_closeAttrClass {
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
