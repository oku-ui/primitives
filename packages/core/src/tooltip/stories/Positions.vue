<script setup lang="ts">
import { TooltipTrigger, useTooltipProvider } from '../index.ts'
import SimpleTooltip from './SimpleTooltip.vue'
import './styles.css'

useTooltipProvider()
</script>

<template>
  <div>
    <div
      :style="{
        display: 'flex',
        minWidth: '500px',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }"
    >
      <div
        :style="{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(5, 50px)',
        }"
      >
        <SimpleTooltip label="Top start">
          <TooltipTrigger
            class="tooltip_positionButtonClass"
            :style="{ gridColumn: '2', gridRow: '1' }"
          >
            Top start
          </TooltipTrigger>
        </SimpleTooltip>

        <SimpleTooltip label="Top center" side="top" align="center">
          <TooltipTrigger
            class="tooltip_positionButtonClass"
            :style="{ gridColumn: '3', gridRow: '1' }"
          >
            Top center
          </TooltipTrigger>
        </SimpleTooltip>
        <SimpleTooltip label="Top end" side="top" align="end">
          <TooltipTrigger
            class="tooltip_positionButtonClass"
            :style="{ gridColumn: '4', gridRow: '1' }"
          >
            Top end
          </TooltipTrigger>
        </SimpleTooltip>

        <SimpleTooltip label="Right start" side="right" align="start">
          <TooltipTrigger
            class="tooltip_positionButtonClass"
            :style="{ gridColumn: '5', gridRow: '2' }"
            tabindex="0"
          >
            Right start
          </TooltipTrigger>
        </SimpleTooltip>
        <SimpleTooltip label="Right center" side="right" align="center">
          <TooltipTrigger
            class="tooltip_positionButtonClass"
            :style="{ gridColumn: '5', gridRow: '3' }"
            tabindex="0"
          >
            Right center
          </TooltipTrigger>
        </SimpleTooltip>
        <SimpleTooltip label="Right end" side="right" align="end">
          <TooltipTrigger
            class="tooltip_positionButtonClass"
            :style="{ gridColumn: '5', gridRow: '4' }"
            tabindex="0"
          >
            Right end
          </TooltipTrigger>
        </SimpleTooltip>

        <SimpleTooltip label="Bottom end" side="bottom" align="end">
          <TooltipTrigger
            class="tooltip_positionButtonClass"
            :style="{ gridColumn: '4', gridRow: '5' }"
          >
            Bottom end
          </TooltipTrigger>
        </SimpleTooltip>
        <SimpleTooltip label="Bottom center" side="bottom" align="center">
          <TooltipTrigger
            class="tooltip_positionButtonClass"
            :style="{ gridColumn: '3', gridRow: '5' }"
          >
            Bottom center
          </TooltipTrigger>
        </SimpleTooltip>
        <SimpleTooltip label="Bottom start" side="bottom" align="start">
          <TooltipTrigger
            class="tooltip_positionButtonClass"
            :style="{ gridColumn: '2', gridRow: '5' }"
          >
            Bottom start
          </TooltipTrigger>
        </SimpleTooltip>

        <SimpleTooltip label="Left end" side="left" align="end">
          <TooltipTrigger
            class="tooltip_positionButtonClass"
            :style="{ gridColumn: '1', gridRow: '4' }"
          >
            Left end
          </TooltipTrigger>
        </SimpleTooltip>
        <SimpleTooltip label="Left center" side="left" align="center">
          <TooltipTrigger
            class="tooltip_positionButtonClass"
            :style="{ gridColumn: '1', gridRow: '3' }"
          >
            Left center
          </TooltipTrigger>
        </SimpleTooltip>
        <SimpleTooltip label="Left start" side="left" align="start">
          <TooltipTrigger
            class="tooltip_positionButtonClass"
            :style="{ gridColumn: '1', gridRow: '2' }"
          >
            Left start
          </TooltipTrigger>
        </SimpleTooltip>
      </div>
    </div>
  </div>
</template>
