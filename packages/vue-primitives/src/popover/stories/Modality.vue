<script setup lang="ts">
import { PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from '../index.ts'
import './styles.css'
</script>

<template>
  <div
    :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '110vh' }"
  >
    <div :style="{ display: 'grid', gap: '50px' }">
      <div :style="{ display: 'inline-flex', alignItems: 'center', flexDirection: 'column' }">
        <h1>Non modal (default)</h1>
        <PopoverRoot>
          <PopoverTrigger class="popover_triggerClass">
            open
          </PopoverTrigger>

          <PopoverPortal>
            <PopoverContent class="popover_contentClass" :side-offset="5">
              <PopoverClose class="popover_closeClass">
                close
              </PopoverClose>
              <PopoverArrow class="popover_arrowClass" :width="20" :height="10" :offset="10" />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>
        <textarea
          :style="{ width: '500px', height: '100px', marginTop: '10px' }"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet.</textarea>
      </div>

      <div :style="{ display: 'inline-flex', alignItems: 'center', flexDirection: 'column' }">
        <h1>Modal</h1>
        <PopoverRoot modal>
          <PopoverTrigger class="popover_triggerClass">
            open
          </PopoverTrigger>

          <PopoverPortal>
            <PopoverContent class="popover_contentClass" :side-offset="5">
              <PopoverClose class="popover_closeClass">
                close
              </PopoverClose>
              <PopoverArrow class="popover_arrowClass" :width="20" :height="10" :offset="10" />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>
        <textarea
          :style="{ width: '500px', height: '100px', marginTop: '10px' }"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet.</textarea>
      </div>
    </div>
  </div>
</template>
