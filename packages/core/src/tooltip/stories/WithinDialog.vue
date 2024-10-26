<script setup lang="ts">
import { DialogClose, DialogContent, DialogDescription, DialogRoot, DialogTitle, DialogTrigger } from '../../dialog/index.ts'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger, useTooltipProvider } from '../index.ts'
import './styles.css'

useTooltipProvider()
</script>

<template>
  <div>
    <DialogRoot>
      <DialogTrigger>Open dialog</DialogTrigger>

      <DialogContent>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogDescription>Dialog description</DialogDescription>
        <DialogClose>Close dialog</DialogClose>
        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover or Focus me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </DialogContent>
    </DialogRoot>
  </div>
</template>
