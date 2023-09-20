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
        <OkuPopoverTrigger class="popover-triggerClass">
          open
        </OkuPopoverTrigger>
        <OkuPopoverPortal>
          <OkuPopoverContent class="popover-contentClass" :side-offset="15">
            <OkuPopoverClose class="popover-closeClass">
              close
            </OkuPopoverClose>
            <OkuPopoverArrow class="popover-arrowClass" :width="20" :height="10" />
          </OkuPopoverContent>
        </OkuPopoverPortal>
      </OkuPopover>
    </div>
  </div>
</template>

<style>
.popover-triggerClass {

}

.popover-contentClass {
  transform-origin: var(--oku-popover-content-transform-origin);
  background-color: #e5e7eb;
  padding: 20px;
  border-radius: 5px;
}
.popover-closeClass {
}

.popover-arrowClass {
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

.popover-animatedContentClass {
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

.popover-gridClass {
  display: inline-grid;
  grid-template-columns: repeat(3, 50px);
  column-gap: 150px;
  row-gap: 100px;
  padding: 100px;
  border: 1px solid black;
}

.popover-chromaticTriggerClass {
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  background-color: tomato;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.popover-chromaticContentClass {
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

.popover-chromaticArrowClass {
  fill: black;
}

.popover-triggerAttrClass {
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

.popover-contentAttrClass {
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

.popover-arrowAttrClass {
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

.popover-closeAttrClass {
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
