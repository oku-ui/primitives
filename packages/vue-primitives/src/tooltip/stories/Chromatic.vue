<script setup lang="ts">
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger, useTooltipProvider } from '../index.ts'
import TooltipProvider from './TooltipProvider.vue'
import './styles.css'

useTooltipProvider()

const SIDE_OPTIONS = ['top', 'right', 'bottom', 'left'] as const
const ALIGN_OPTIONS = ['start', 'center', 'end'] as const

// change order slightly for more pleasing visual
const SIDES = (SIDE_OPTIONS as any as string[]).filter(side => side !== 'bottom').concat(['bottom']) as any[]
</script>

<template>
  <div>
    <div :style="{ padding: '200px' }">
      <h1>Uncontrolled</h1>
      <h2>Closed</h2>
      <TooltipRoot>
        <TooltipTrigger class="tooltip_triggerClass">
          open
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent class="tooltip_contentClass" :side-offset="5">
            Some content
            <TooltipArrow class="tooltip_arrowClass" :offset="10" />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>

      <h2 :style="{ marginBottom: '60px' }">
        Open
      </h2>
      <TooltipRoot default-open>
        <TooltipTrigger class="tooltip_triggerClass">
          open
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent class="tooltip_contentClass" :side-offset="5">
            Some content
            <TooltipArrow class="tooltip_arrowClass" :offset="10" />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>

      <h2 :style="{ marginTop: '60px', marginBottom: '60px' }">
        Open with reordered parts
      </h2>
      <TooltipRoot default-open>
        <TooltipPortal>
          <TooltipContent class="tooltip_contentClass" :side-offset="5">
            Some content
            <TooltipArrow class="tooltip_arrowClass" :offset="10" />
          </TooltipContent>
        </TooltipPortal>
        <TooltipTrigger class="tooltip_triggerClass">
          open
        </TooltipTrigger>
      </TooltipRoot>

      <h1 :style="{ marginTop: '100px' }">
        Controlled
      </h1>
      <h2>Closed</h2>
      <TooltipRoot :open="false">
        <TooltipTrigger class="tooltip_triggerClass">
          open
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent class="tooltip_contentClass" :side-offset="5">
            Some content
            <TooltipArrow class="tooltip_arrowClass" :offset="10" />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>

      <h2 :style="{ marginBottom: '60px' }">
        Open
      </h2>
      <TooltipRoot open>
        <TooltipTrigger class="tooltip_triggerClass">
          open
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent class="tooltip_contentClass" :side-offset="5">
            Some content
            <TooltipArrow class="tooltip_arrowClass" :offset="10" />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>

      <h2 :style="{ marginTop: '60', marginBottom: '60ox' }">
        Open with reordered parts
      </h2>
      <TooltipRoot open>
        <TooltipPortal>
          <TooltipContent class="tooltip_contentClass" :side-offset="5">
            Some content
            <TooltipArrow class="tooltip_arrowClass" :offset="10" />
          </TooltipContent>
        </TooltipPortal>
        <TooltipTrigger class="tooltip_triggerClass">
          open
        </TooltipTrigger>
      </TooltipRoot>

      <h1 :style="{ marginTop: '100px' }">
        Positioning
      </h1>
      <h2>No collisions</h2>
      <h3>Side & Align</h3>
      <div class="tooltip_gridClass">
        <template v-for="side in SIDES">
          <TooltipRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
            <TooltipTrigger class="tooltip_chromaticTriggerClass" />
            <TooltipPortal>
              <TooltipContent
                class="tooltip_chromaticContentClass"
                :side="side"
                :align="align"
                :avoid-collisions="false"
              >
                <p :="{ textAlign: 'center' }">
                  {{ side }}
                  <br>
                  {{ align }}
                </p>
                <TooltipArrow class="tooltip_chromaticArrowClass" :width="20" :height="10" />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </template>
      </div>

      <h3>Side offset</h3>
      <h4>Positive</h4>
      <div class="tooltip_gridClass">
        <template v-for="side in SIDES">
          <TooltipRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
            <TooltipTrigger class="tooltip_chromaticTriggerClass" />
            <TooltipPortal>
              <TooltipContent
                class="tooltip_chromaticContentClass"
                :side="side"
                :side-offset="5"
                :align="align"
                :avoid-collisions="false"
              >
                <p :style="{ textAlign: 'center' }">
                  {{ side }}
                  <br>
                  {{ align }}
                </p>
                <TooltipArrow class="tooltip_chromaticArrowClass" :width="20" :height="10" />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </template>
      </div>

      <h4>Negative</h4>
      <div class="tooltip_gridClass">
        <template v-for="side in SIDES">
          <TooltipRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
            <TooltipTrigger class="tooltip_chromaticTriggerClass" />
            <TooltipPortal>
              <TooltipContent
                class="tooltip_chromaticContentClass"
                :side="side"
                :side-offset="-10"
                :align="align"
                :avoid-collisions="false"
              >
                <p :style="{ textAlign: 'center' }">
                  {{ side }}
                  <br>
                  {{ align }}
                </p>
                <TooltipArrow class="tooltip_chromaticArrowClass" :width="20" :height="10" />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </template>
      </div>

      <h3>Align offset</h3>
      <h4>Positive</h4>
      <div class="tooltip_gridClass">
        <template v-for="side in SIDES">
          <TooltipRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
            <TooltipTrigger class="tooltip_chromaticTriggerClass" />
            <TooltipPortal>
              <TooltipContent
                class="tooltip_chromaticContentClass"
                :side="side"
                :align="align"
                :align-offset="20"
                :avoid-collisions="false"
              >
                <p :style="{ textAlign: 'center' }">
                  {{ side }}
                  <br>
                  {{ align }}
                </p>
                <TooltipArrow class="tooltip_chromaticArrowClass" :width="20" :height="10" />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </template>
      </div>

      <h4>Negative</h4>
      <div class="tooltip_gridClass">
        <template v-for="side in SIDES">
          <TooltipRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
            <TooltipTrigger class="tooltip_chromaticTriggerClass" />
            <TooltipPortal>
              <TooltipContent
                class="tooltip_chromaticContentClass"
                :side="side"
                :align="align"
                :align-offset="-10"
                :avoid-collisions="false"
              >
                <p :style="{ textAlign: 'center' }">
                  {{ side }}
                  <br>
                  {{ align }}
                </p>
                <TooltipArrow class="tooltip_chromaticArrowClass" :width="20" :height="10" />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </template>
      </div>

      <h2>Collisions</h2>
      <p>See instances on the periphery of the page.</p>
      <template v-for="side in SIDES">
        <TooltipRoot v-for="align in ALIGN_OPTIONS" :key="`${side}-${align}`" open>
          <TooltipTrigger
            class="tooltip_chromaticTriggerClass"
            :style="{
              position: 'absolute',
              [side]: '10px',
              ...((side === 'right' || side === 'left')
                && (align === 'start'
                  ? { bottom: '10px' }
                  : align === 'center'
                    ? { top: 'calc(50% - 15px)' }
                    : { top: '10px' })),
              ...((side === 'top' || side === 'bottom')
                && (align === 'start'
                  ? { right: '10px' }
                  : align === 'center'
                    ? { left: 'calc(50% - 15px)' }
                    : { left: '10px' })),
            }"
          />
          <TooltipPortal>
            <TooltipContent class="tooltip_chromaticContentClass" :side="side" :align="align">
              <p :style="{ textAlign: 'center' }">
                {{ side }}
                <br>
                {{ align }}
              </p>
              <TooltipArrow class="tooltip_chromaticArrowClass" :width="20" :height="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </template>

      <h2 :style="{ marginTop: '50px', marginBottom: '60px' }">
        Relative parent (non-portalled)
      </h2>
      <div :style="{ position: 'relative' }">
        <TooltipProvider>
          <TooltipRoot open>
            <TooltipTrigger class="tooltip_triggerClass">
              Hover or Focus me
            </TooltipTrigger>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipRoot>
        </TooltipProvider>
      </div>

      <h1 :style="{ marginTop: '100px', marginBottom: '60px' }">
        With slotted trigger
      </h1>
      <TooltipRoot open>
        <TooltipTrigger as="template">
          <button class="tooltip_triggerClass">
            open
          </button>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent class="tooltip_contentClass" :side-offset="5">
            Some content
            <TooltipArrow class="tooltip_arrowClass" :width="20" :height="10" :offset="10" />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>

      <h1 :style="{ marginTop: '100px', marginBottom: '60px' }">
        With slotted content
      </h1>
      <TooltipRoot open>
        <TooltipTrigger class="tooltip_triggerClass">
          Hover or Focus me
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent as="template" :side-offset="5">
            <div class="tooltip_contentClass">
              Some content
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </div>
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </div>
  </div>
</template>
